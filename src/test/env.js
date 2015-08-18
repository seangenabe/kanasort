
import {expect} from 'chai'

describe('environment', function() {

  it('should define String.prototype.codePointAt', function() {
    expect(String).to.respondTo('codePointAt')
  })

})