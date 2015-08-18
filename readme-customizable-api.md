# Customizable API

Customizable parts of the API.

## API

### class kanasort.Sorter

The Sorter class is the main customizable element of this module.

The Sorter goes through each Transform, transforms it to a simpler form, and
in the process assigns a weight to each character. When comparing two strings,
they are transformed first, then evaluated character-by-character while taking
into consideration the weights assigned by the `Transform` instances.

#### #constructor()

Initializes a new instance of `Sorter`.

The constructor does not have any options, but after calling the constructor,
you can modify the `Sorter#transforms` and `Sorter#weightPriority` arrays and
the caches as you see fit. Note that this is the only chance you'll get to do
so, once any transform is made, any changes to these properties will lead to
undefined (mostly caching) behavior.

#### #transforms: Type[]

An array of class constructors that we will go through
in order when transforming a string.

#### #weightPriority: Type[]

An array of the same class constructors as `#transforms`. In order, this
is the priority of evaluation of weights each transformer will assign to each
character.

#### #transform(str: string): TransformedString

Transforms the string using `#transforms`, assigning a weight to each character.
Cache-enabled.

#### #compare(a: string, b: string): number

Compares two strings.

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

WeightedCharacterTransform is comparable to a `streams.Transform` in object
mode, processing TransformedCharacter instances. Although, the transform
function changes the state of TransformedCharacter in-place, and is synchronous
in nature.

#### #transform(tc: TransformedCharacter)

Transforms the specified `TransformedCharacter` instance. Implementors
overriding this method should:
* Do one of the following to `tc.value`:
  * Nothing, leave the current value in place
  * Assign a new value
  * Set to null, this means the character is removed from the string and should
    be skipped
* Assign a weight to tc.weights using:

  `tc.weights.set(MyTransformClass, weight)`

  where MyTransformClass is the class constructor distinguishing the transform,
  and weight is a number.
  It is recommended to always assign a weight when called. If a transform is
  included in the transforms but a weight isn't assigned, comparison for the
  transform will be skipped.
