
import {expect} from 'chai'
import TransformedString from '../transformed-string'
import KataToHiraTransform from '../transforms/kata-to-hira-transform'

describe('KataToHiraTransform', function() {

  it('default should transform correctly', function() {
    var x = new TransformedString('アあカ', [KataToHiraTransform])
    expect(x.value).to.equal('ああか')
    expect(x.items).to.have.length(3)
    expect(x.items[0].weights.get(KataToHiraTransform)).to.equal(1)
    expect(x.items[1].weights.get(KataToHiraTransform)).to.equal(0)
    expect(x.items[2].weights.get(KataToHiraTransform)).to.equal(1)
  })

})
