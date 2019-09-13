const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('test_jwt', 'utf8');
const publicKey = fs.readFileSync('test_jwt.pub', 'utf8');

describe('JWT', () => {

  it('should sign token use private key', () => {
    const message = 'tung pm';
    var token = null;
    try {
      token = jwt.sign({ message }, privateKey, { algorithm: 'RS256' });
    } catch (e) {
      token = null;
    }
    expect(token).to.not.equal(null);
  })

  it('should verify the token use public key', () => {
    const message = 'tung pm';
    const token = jwt.sign({ message }, privateKey, { algorithm: 'RS256' });
    var decoded = null;
    try {
      decoded = jwt.verify(token, publicKey, { algorithm: 'RS256' });
    } catch (e) {
      decoded = null
    }
    expect(decoded).to.not.equal(null);
    expect(decoded).to.be.an('object');
  })
})