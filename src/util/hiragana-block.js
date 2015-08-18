
export const HIRA_START = 0x3041 // 'ぁ'.codePointAt(0)
export const HIRA_END = 0x3094 // 'ゔ'.codePointAt(0)

export default function isHiragana(char) {
  var codePoint = char.codePointAt(0)
  return HIRA_START <= codePoint && codePoint <= HIRA_END
}
