
export default function(str) {
  var arr,
    i = 0,
    ret = []
  for (let char of str) {
    if (i % 2 === 0) arr = []
    arr.push(char)
    if (i % 2 === 1) ret.push(arr)
    i++
  }
  return ret
}
