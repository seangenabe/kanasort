# kanasort

Sort Japanese text.

[![Build Status](https://travis-ci.org/seangenabe/kanasort.svg?branch=master)](https://travis-ci.org/seangenabe/kanasort)
[![Dependency Status](https://david-dm.org/seangenabe/kanasort.svg)](https://david-dm.org/seangenabe/kanasort)
[![devDependency Status](https://david-dm.org/seangenabe/symbol-enum/dev-status.svg)](https://david-dm.org/seangenabe/symbol-enum#info=devDependencies)

## Overview

This module was built in order to support sorting of strings containing
Japanese text. It can't sort kanji though, ideally one should already have the
corresponding [readings](https://en.wikipedia.org/wiki/Furigana) at hand.

This module partially follows the specifications of JIS X 4061 as seen on [Wikipedia](https://ja.wikipedia.org/wiki/%E6%97%A5%E6%9C%AC%E8%AA%9E%E6%96%87%E5%AD%97%E5%88%97%E7%85%A7%E5%90%88%E9%A0%86%E7%95%AA).

The API is ready to use as-is, but is also
[fully customizable](readme-customizable-api.md).

The `--harmony` flag might be required for proper ES2015 string support on
node.js 0.11-0.12.

## API

`var kanasort = require('kanasort')` or `import kanasort from 'kanasort'`

### kanasort(arr: string[]) : string[]

Sorts the specified array in-place and returns the array using the default
Japanese string comparison.
(This is just a call to `Array.prototype.sort`.)

### kanasort.compare(a: string, b: string)

A comparison function ([`comparefn`](http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.sort))
using the default Japanese string transforms that returns:

* A negative value if a < b
* A positive value if a > b
* `0` if a = b.

### Customizable API

For further customization, see the
[Customizable API](readme-customizable-api.md).

## CLI

Usage:

```bash
kanasort < input.txt > output.txt
```

Sorts standard input line by line.

## License

MIT

## See also

Thanks to [minodisk/sorter](https://github.com/minodisk/sorter) for supporting
my private hobby project sorting needs and for being the inspiration for this
module.

* [JIS X 4061-1996](http://kikakurui.com/x4/X4061-1996-01.html)
