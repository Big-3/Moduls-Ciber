describe('provant de generar un parell de claus RSA amb generateKeys()', function () {
  const inputs = [2048, 1024, 512, 256, 128, 64, 32, 24, 12, 8, 4, 2]
  for (const nbits of inputs) {
    describe(`generateKeys(${nbits})`, function () {
      it('should evaluate that both keys are able to encrypt and decrypt', async function () {
        this.timeout(4000)
        const val = await _pkg.generateKeys(nbits)
        chai.expect(BigInt(2)).to.equal(val.decrypt(val.getPublicKey().encrypt(BigInt(2))))
      })
    })
  }
})
