export function isHTML(data: string) {
  return /<\/?[a-z][\s\S]*>/i.test(data)
}
