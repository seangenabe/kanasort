# Customizable API

Customizable parts of the API.

## API

### class kanasort.Sorter

The Sorter class is the main customizable element of this module.

The Sorter goes through each Transform, transforms it to a simpler form, and
in the process assigns a weight to each character. When comparing two strings,
they are transformed first, then evaluated character-by-character while taking
into consideration the weights assigned by the `Transform` instances.

#### #constructor(transforms, opts)

Initializes a new instance of `Sorter`.
* `transforms`
  * `transformsfn(str: string): Transform[]`:
  * `weights: number[]`
* `opts`
  * `transformCache: object`: LRUCache options
  * `compareCache: object`: MKC options

#### #transform(str: string): TransformedString

Transforms the string using `#transforms`, assigning a weight to each character.
Cache-enabled.

#### #compare(a: string, b: string): number

Compares two strings. Cache-enabled.

#### Sorter.default

Returns a singleton instance of Sorter. Used by `kanasort` and
`kanasort.compare`.

#### #transformCache: LRUCache<string, TransformedString>

An LRU cache of transformed strings. Can be set after calling the constructor
to override. Set to null to disable.

#### #compareCache: MultiKeyCache<[string, string], number>

A multi-key LRU cache of comparisons. Can be set after calling the constructor
to override. Set to null to disable.

#### #initializeTransformCache(opts: object = {})

(Re-)initializes the transform cache. Use if you just want to modify the
options passed to the `lru-cache` constructor.

### class kanasort.WeightedCharacterTransform

`WeightedCharacterTransform` is the base class of all transforms used by this
module. It processes each character of a string and assigns a weight to it. A
lesser weight goes before a greater weight.

An instance is constructed for each string.

#### #transform(tc: TransformedCharacter)

Returns an instruction that instructs how to transform the specified `TransformedCharacter` instance:
* `null` or `undefined`: No transformation should be done to the character.
* Array: [str: string, weight: number]: The character should be transformed to `str` with `weight` weight.
* Array: [null]: The character should be discarded.
