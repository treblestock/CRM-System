import { customRef } from "vue";
import { debounce } from "~/utils/general";

export default function <T>(value: T, ms: number = 300) {
  return customRef<T>((track, trigger) => {
    const updater = debounce((newValue: T) => {
      value = newValue
      trigger()
    }, ms)

    return {
      get: () => {
        track()
        return value
      },
      set: updater,
    }
  })
}