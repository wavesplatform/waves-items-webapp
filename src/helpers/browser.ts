export const isChrome = (): boolean => {
  return navigator.userAgent.indexOf('Chrome') !== -1
}

export const isFirefox = (): boolean => {
  return navigator.userAgent.indexOf('Firefox') !== -1
}
