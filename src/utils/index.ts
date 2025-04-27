export function checkIsValidTodoTitle(title: unknown) {
  return typeof title === 'string' && title.length >= 2 && title.length <= 64
}