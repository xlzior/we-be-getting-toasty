export function range(min: number, max: number, step: number) {
  let result = []
  for (let i = min; i <= max; i += step) {
    result.push(i)
  }
  return result
}
