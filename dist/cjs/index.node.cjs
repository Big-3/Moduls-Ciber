'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var bcu = require('bigint-crypto-utils');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var bcu__namespace = /*#__PURE__*/_interopNamespace(bcu);

class RSAPublicKey {
    constructor(e, n) {
        this.e = e;
        this.n = n;
    }
    getExpE() {
        return this.e;
    }
    getModN() {
        return this.n;
    }
    encrypt(m) {
        return bcu__namespace.modPow(m, this.e, this.n); // obtenim c (missatge encriptat)
    }
    verify(s) {
        return bcu__namespace.modPow(s, this.e, this.n); // obtenim h (hash encriptat)
    }
}
class RSAPrivateKey {
    constructor(d, pubKey) {
        this.d = d;
        this.pubKey = pubKey;
    }
    getExpD() {
        return this.d;
    }
    getRSAPublicKey() {
        return this.pubKey;
    }
    decrypt(c) {
        return bcu__namespace.modPow(c, this.d, this.pubKey.getModN()); // obtenim m (missatge enviat)
    }
    sign(h) {
        return bcu__namespace.modPow(h, this.d, this.pubKey.getModN()); // obtenim s (resum hash)
    }
}
async function genPrime(nbits) {
    let n = BigInt(10);
    while (!await bcu__namespace.isProbablyPrime(n)) {
        n = await bcu__namespace.prime(nbits);
    }
    return n;
}
function isCoprime(a, b) {
    const exp = BigInt(1);
    return bcu__namespace.gcd(a, b) === exp;
}
function genE(mcm, nbits) {
    let e = bcu__namespace.randBetween(mcm, BigInt(1));
    while (!isCoprime(e, mcm)) {
        e = bcu__namespace.randBetween(mcm, BigInt(1));
    }
    return e;
}
async function generateRSAKeys(nbits = 2048) {
    // Qualsevol 2 nombres primers
    const p = await genPrime(nbits);
    const q = await genPrime(nbits);
    // Calculem el mòdul
    const n = p * q;
    const phiN = BigInt((p - BigInt(1)) * (q - BigInt(1)));
    // Generem l'exponent e:
    const mcm = bcu__namespace.lcm(p - BigInt(1), q - BigInt(1));
    const e = await genE(mcm);
    // Generem l'exponent d:
    const d = bcu__namespace.modInv(e, phiN); // ed = 1 mod(phiN)
    const pubKey = new RSAPublicKey(e, n);
    const privKey = new RSAPrivateKey(d, pubKey);
    return privKey;
}

// ================ CLASS ================
class PaillierPublicKey {
    constructor(n, n2, g) {
        this.n = n;
        this.n2 = n2;
        this.g = g;
    }
    getN() {
        return this.n;
    }
    getN2() {
        return this.n2;
    }
    getG() {
        return this.g;
    }
    encrypt(m) {
        const r = bcu__namespace.randBetween(this.n2);
        return (bcu__namespace.modPow(this.g, m, this.n2) * bcu__namespace.modPow(r, this.n, this.n2)) % this.n2;
    }
    add(cs) {
        let ret = 1n;
        for (const c of cs) {
            ret *= c;
        }
        return ret % this.n2;
    }
    multiply(c, m) {
        return bcu__namespace.modPow(c, m, this.n2);
    }
}
class PaillierPrivateKey {
    constructor(lambda, mu, pubKey) {
        this.lambda = lambda;
        this.mu = mu;
        this.pubKey = pubKey;
    }
    getLambda() {
        return this.lambda;
    }
    getMu() {
        return this.mu;
    }
    getPubKey() {
        return this.pubKey;
    }
    decrypt(c) {
        return (L(bcu__namespace.modPow(c, this.lambda, this.pubKey.getN2()), this.pubKey.getN()) * this.mu) % this.pubKey.getN();
    }
}
// ===========================================
// ================ FUNCTIONS ================
async function getPrime(nbits) {
    let n = 10n;
    while (!await bcu__namespace.isProbablyPrime(n)) {
        n = await bcu__namespace.prime(nbits);
    }
    return n;
}
/*
function isCoprime (a: bigint, b: bigint): boolean {
  const exp: bigint = 1n
  return bcu.gcd(a, b) === exp
}
*/
function L(x, n) {
    let mu = 1n;
    mu = (x - 1n) / n;
    return mu;
}
async function generatePaillierKeys(nbits = 2048) {
    // Get Primes
    const q = await getPrime(Math.floor(nbits / 2) + 1);
    const p = await getPrime(Math.floor(nbits) / 2);
    // Set modular space
    const n = q * p;
    const n2 = n ** 2n;
    // Set lambda
    const lambda = bcu__namespace.lcm(p - 1n, q - 1n);
    const g = bcu__namespace.randBetween(n2, 1n);
    const mu = bcu__namespace.modInv(L(bcu__namespace.modPow(g, lambda, n2), n), n);
    // public key
    const pubKey = new PaillierPublicKey(n, n2, g);
    const privKey = new PaillierPrivateKey(lambda, mu, pubKey);
    return privKey;
}
// ===========================================

exports.PaillierPrivateKey = PaillierPrivateKey;
exports.PaillierPublicKey = PaillierPublicKey;
exports.RSAPrivateKey = RSAPrivateKey;
exports.RSAPublicKey = RSAPublicKey;
exports.generatePaillierKeys = generatePaillierKeys;
exports.generateRSAKeys = generateRSAKeys;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgubm9kZS5janMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cy9SU0EudHMiLCIuLi8uLi9zcmMvdHMvUGFpbGxpZXIudHMiXSwic291cmNlc0NvbnRlbnQiOm51bGwsIm5hbWVzIjpbImJjdSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFDYSxZQUFZO0lBSXZCLFlBQWEsQ0FBUyxFQUFFLENBQVM7UUFDL0IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDVixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtLQUNYO0lBRU0sT0FBTztRQUNaLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQTtLQUNkO0lBRU0sT0FBTztRQUNaLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQTtLQUNkO0lBRU0sT0FBTyxDQUFFLENBQVM7UUFDdkIsT0FBT0EsY0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDckM7SUFFTSxNQUFNLENBQUUsQ0FBUztRQUN0QixPQUFPQSxjQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUNyQztDQUNGO01BQ1ksYUFBYTtJQUl4QixZQUFhLENBQVMsRUFBRSxNQUFvQjtRQUMxQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNWLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0tBQ3JCO0lBRU0sT0FBTztRQUNaLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQTtLQUNkO0lBRU0sZUFBZTtRQUNwQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUE7S0FDbkI7SUFFTSxPQUFPLENBQUUsQ0FBUztRQUN2QixPQUFPQSxjQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUks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
