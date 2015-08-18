
import {expect} from 'chai'
import TransformedString from '../transformed-string'
import Transform from '../transforms/transform'

describe('Transform', function() {

  var testStrings = ['', 'a', 'foo']

  var codePointsLength = function(s) { var i = 0; for (let _ of s) i++; return i}

  for (let testString of testStrings) {
    it('should transform correctly: ' + testString, function() {
      var x = new TransformedString(testString, [Transform])
      expect(x).to.be.an.instanceof(TransformedString)
      for (let item of x) {
        expect(item.weights.get(Transform)).to.equal(0)
      }
      expect(x.items).to.have.length(codePointsLength(testString))
    })
  }

})
