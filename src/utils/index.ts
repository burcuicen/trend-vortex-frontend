//scrollTo function
export const scrollTo = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (!element) return
  element.scrollIntoView({ behavior: 'smooth' })
}
