import { IUser } from '../types'

class AuthHelper {
  constructor() {
  }

  getUser(): IUser {
    const storageItem = localStorage.getItem('user')
    return storageItem && JSON.parse(storageItem)
  }

  setUser(user: IUser): void {
    localStorage.setItem('user', JSON.stringify(user))
  }

  removeUser(): void {
    localStorage.removeItem('user')
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  setToken(token: string): void {
    localStorage.setItem('token', token)
  }

  removeToken(): void {
    localStorage.removeItem('token')
  }

  // getToken(address: string): string {
  //   const storageItem = localStorage.getItem('tokens')
  //   const tokens = storageItem ? JSON.parse(storageItem) || {} : {}
  //
  //   return tokens[address]
  // }
  //
  // setToken(address: string, token: string): void {
  //   const storageItem = localStorage.getItem('tokens')
  //   const tokens = storageItem ? JSON.parse(storageItem) || {} : {}
  //
  //   tokens[address] = token
  //
  //   localStorage.setItem('tokens', JSON.stringify(tokens))
  // }
  //
  // removeToken(address: string): void {
  //   const storageItem = localStorage.getItem('tokens')
  //   const tokens = storageItem ? JSON.parse(storageItem) || {} : {}
  //
  //   tokens[address] && delete tokens[address]
  //
  //   localStorage.setItem('tokens', JSON.stringify(tokens))
  // }
}

export default new AuthHelper()
