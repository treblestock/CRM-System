// eslint-disable-next-line
export function debounce<F extends (...args: any) => void>(cb: F, ms: number): F {
  let timerId: number

  return function (...args: Parameters<F>) {
    clearTimeout(timerId)
    timerId = setTimeout(() => cb(...args), ms)
  } as F
}