export function checkStringInLengthRange(
  title: unknown, minLeng = 0, maxLeng = Number.MAX_SAFE_INTEGER
) {
  return typeof title === 'string' && title.length >= minLeng && title.length <= maxLeng
}