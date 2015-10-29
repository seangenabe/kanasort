
const {expect} = require('chai')
const TransformedString = require('../transformed-string')
const KataToHiraTransform = require('../transforms/kata-to-hira-transform')
const TransformedCharacter = require('../transformed-character')

describe('KataToHiraTransform', function() {

  it('default should transform correctly', function() {
    var x = new TransformedString('アあカ', [KataToHiraTransform])
    expect(x.value).to.equal('ああか')
    expect(x.items).to.have.length(3)
    expect(x.items[0].weights.get(KataToHiraTransform)).to.equal(1)
    expect(x.items[1].weights.get(KataToHiraTransform)).to.equal(0)
    expect(x.items[2].weights.get(KataToHiraTransform)).to.equal(1)
  })

  it('should expect null', function() {
    let transform = new KataToHiraTransform()
    let c = new TransformedCharacter(null)
    transform.transform(c)
    expect(c.value).to.be.null
    expect(c.weights.get(KataToHiraTransform)).to.equal(0)
  })

})
