
const split = require('split')
const Sorter = require('./sorter')

function cli() {
  var lines = []
  process.stdin.pipe(split())
  .on('data', function(line) {
    lines.push(line)
  })
  .on('end', function() {
    sort(lines)
    process.stdout.write(lines.join(EOL))
  })
}

function compare(a, b) {
  return Sorter.default.compare(a, b)
}

function sort(arr) {
  return Array.prototype.sort.call(arr, compare)
}

module.exports = sort
module.exports.Sorter = Sorter
module.exports.console = cli
module.exports.compare = compare

if (require.main === module) {
  cli()
}
