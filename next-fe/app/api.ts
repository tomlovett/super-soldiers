import type { Soldier } from './types'

export type RequestPayload = Record<string, string | Date | RequestPayload[] | number | boolean>

type FetcherProps = {
  path: string
} & Partial<{
  method: string
  options: RequestInit
  data: RequestPayload | RequestPayload[]
}>

type FetchOptions = {
  headers: any
  path: string
  method: string
  body?: string
}

const defaultOpts = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
    'Access-Control-Allow-Origin': '*',
  },
  method: 'GET',
}

class ApiClient {
  constructor() {}

  private getAuthToken = (): string | void =>
    'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MDM4NjY1NTF9.jt3EtEHjK9iV65pke3uiLXjNwmPrUJzoU6W8xDIl8zo'

  // https://stackoverflow.com/questions/63313799/typescript-argument-cant-use-any-in-fetch
  private fetcher = async <T>(options: FetcherProps): Promise<T> => {
    let fetchOpts: FetchOptions = Object.assign(defaultOpts, options)

    if (options.data) {
      fetchOpts.body = JSON.stringify(options.data)
    }

    fetchOpts.headers.Authorization = 'Bearer: ' + this.getAuthToken()

    const { path } = options
    const fullPath: string = path.includes('http') ? path : 'http://localhost:3000' + path

    let response: Response

    try {
      response = await fetch(fullPath, fetchOpts)

      if (!response?.ok) {
        if (typeof window !== 'undefined') {
          return Promise.reject(new Error(`${response.status}: ${response.statusText}`))
        } else {
          throw new Error(`${response.status}: ${response.statusText}`)
        }
      }

      return await response.json()
    } catch (error) {
      throw new Error(`response.json() error: ${error}`)
    }
  }

  useSoldiers = async () => await this.fetcher<Soldier[]>({ path: '/soldiers' })
}

const apiClient = new ApiClient()

export default apiClient
