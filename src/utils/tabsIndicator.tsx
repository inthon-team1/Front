export const handleTabsDefault = (location: string) => {
  switch (location) {
    case '/':
      return 0
    case '/program':
      return 1
    case '/introduction':
      return 2
    case '/location':
      return 3
    default:
      return 0
  }
}
