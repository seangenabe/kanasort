
import {isHiragana} from './hiragana-block'
import {isKatakana} from './katakana-block'

export default function isKana(char) {
  return isHiragana(char) || isKatakana(char)
}
