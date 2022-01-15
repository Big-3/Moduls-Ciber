describe('provant de generar un parell de claus RSA amb generateRSAKeys()', function () {
  const inputs = [2048, 1024, 512, 256, 128, 64, 32]
  for (const nbits of inputs) {
    describe(`generateRSAKeys(${nbits})`, function () {
      it('should evaluate that both keys are able to encrypt and decrypt', async function () {
        this.timeout(10000)
        const val = await _pkg.generateRSAKeys(nbits)
        chai.expect(BigInt(2)).to.equal(val.decrypt(val.getRSAPublicKey().encrypt(BigInt(2))))
      })
    })
  }
})
