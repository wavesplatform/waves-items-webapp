import { IUser } from '../../types'

class AuthService {
  constructor() {
  }

  getUser(): IUser {
    const storageItem = localStorage.getItem('user')
    return storageItem && JSON.parse(storageItem)
  }

  setUser(user: IUser | null): void {
    localStorage.setItem('user', JSON.stringify(user))
  }

  getToken(address: string): string {
    const storageItem = localStorage.getItem('tokens')
    const tokens = storageItem ? JSON.parse(storageItem) || {} : {}

    return tokens[address]
  }

  setToken(address: string, token: string): void {
    const storageItem = localStorage.getItem('tokens')
    const tokens = storageItem ? JSON.parse(storageItem) || {} : {}

    tokens[address] = token

    localStorage.setItem('tokens', JSON.stringify(tokens))
  }

  removeToken(address: string): void {
    const storageItem = localStorage.getItem('tokens')
    const tokens = storageItem ? JSON.parse(storageItem) || {} : {}

    tokens[address] && delete tokens[address]

    localStorage.setItem('tokens', JSON.stringify(tokens))
  }
}

export const authService = new AuthService()
