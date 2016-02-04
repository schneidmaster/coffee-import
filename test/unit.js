var fs        = require('fs');
var expect    = require('chai').expect;
var converter = require('../index');

var readFixture = function(filename) {
  return fs.readFileSync('./test/fixtures/import_' + filename + '.coffee').toString();
}

describe('ES6 import transpilation', function() {
  it('converts default imports', function() {
    expect(converter(readFixture('default'))).to.equal(readFixture('default.transpiled'));
  });

  it('converts bracket imports', function() {
    expect(converter(readFixture('brackets'))).to.equal(readFixture('brackets.transpiled'));
  });

  it('converts star imports', function() {
    expect(converter(readFixture('star'))).to.equal(readFixture('star.transpiled'));
  });

  it('converts with weird spacing and keywords', function() {
    expect(converter(readFixture('spacing'))).to.equal(readFixture('spacing.transpiled'));
  });
});
