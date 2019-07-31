const Identity = require('identity-img')
Identity.config({ rows: 8, cells: 8 })

export const generateAvatar = (address: string): string => {
  const img = new Image()
  img.src = Identity.create(address, { size: 96 })
  return img.src
}
