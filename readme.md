# kanasort

Sort Japanese text.

[![npm](https://img.shields.io/npm/v/kanasort.svg?style=flat-square)](https://www.npmjs.com/package/kanasort)
[![Build Status](https://img.shields.io/travis/seangenabe/kanasort/master.svg?style=flat-square)](https://travis-ci.org/seangenabe/kanasort)
[![Dependency Status](https://img.shields.io/david/seangenabe/kanasort.svg?style=flat-square)](https://david-dm.org/seangenabe/kanasort)
[![devDependency Status](https://img.shields.io/david/dev/seangenabe/kanasort.svg?style=flat-square)](https://david-dm.org/seangenabe/symbol-enum#info=devDependencies)

## Overview

This module was built in order to support sorting of strings containing
Japanese text. It can't sort kanji though, ideally one should already have the
corresponding [readings](https://en.wikipedia.org/wiki/Furigana) at hand.

This module partially follows the specifications of JIS X 4061 as seen on [Wikipedia](https://ja.wikipedia.org/wiki/%E6%97%A5%E6%9C%AC%E8%AA%9E%E6%96%87%E5%AD%97%E5%88%97%E7%85%A7%E5%90%88%E9%A0%86%E7%95%AA).

The API is ready to use as-is, but is also
[fully customizable](readme-customizable-api.md).

## API

`const kanasort = require('kanasort')`

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

## Default transforms

The following are the transforms included by default (in order of processing):

1. small to big kana (ぁ→あ)
2. voiced to unvoiced (が→か)
3. half-voiced to unvoiced (ぱ→は)
4. katakana to hiragana (サ→さ)
5. iteration mark variants (ヾ→ゝ)
6. chōon to corresponding kana (かー→かあ)
7. iteration mark application (こゝ→ここ)

In order, the weight priority of each:

1. unvoiced < half-voiced
2. unvoiced < voiced
3. chōon to corresponding kana (reversed)
4. small to big kana (reversed)
5. iteration mark variants (reversed)
6. iteration mark application (reversed)
7. hiragana < katakana

Transformed matches are ordered first (and untransformed matches are ordered last) on transforms marked as 'reversed'.

## Todo

JSDoc all of this so we don't have to scratch our heads.

## License

MIT

## See also

Thanks to [minodisk/sorter](https://github.com/minodisk/sorter) for supporting
my private hobby project sorting needs and for being the inspiration for this
module.

* [JIS X 4061-1996](http://kikakurui.com/x4/X4061-1996-01.html)
* [MDN: `Intl`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl) ([ECMAScript internationalization API spec](http://www.ecma-international.org/ecma-402/1.0/))
