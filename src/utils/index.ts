export function isValidTodoTitle(title: string) {
  return title.length >= 2 && title.length <= 64
}