
const {expect} = require('chai')
const TransformedString = require('../transformed-string')
const HalfVoicedTransform = require('../transforms/half-voiced-transform')
const TransformedCharacter = require('../transformed-character')

describe('HalfVoicedTransform', function() {

  it('default should transform correctly', function() {
    let x = new TransformedString('あがはばぱ', [HalfVoicedTransform])
    expect(x.value).to.equal('あがはばは')
    expect(x.items).to.have.length(5)
    ;[0, 0, 0, 0, 1].forEach(function(w, i) {
      expect(x.items[i].weights.get(HalfVoicedTransform)).to.equal(w)
    })
  })

  it('should expect null', function() {
    let transform = new HalfVoicedTransform()
    let c = new TransformedCharacter(null)
    transform.transform(c)
    expect(c.value).to.be.null
    expect(c.weights.get(HalfVoicedTransform)).to.equal(0)
  })

})
