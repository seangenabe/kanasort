
export const KATA_START = 0x30a1 // 'ァ'.codePointAt(0)
export const KATA_END = 0x30fa // 'ヺ'.codePointAt(0)

export default function isKatakana(char) {
  var codePoint = char.codePointAt(0)
  return KATA_START <= codePoint && codePoint <= KATA_END
}
