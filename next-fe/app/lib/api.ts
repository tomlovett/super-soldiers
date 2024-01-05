import type { Mission } from 'types'
import { Soldier } from 'classes'

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

const castToClass = <T>(responseData: any | any[], klass?: any): T | T[] =>
  responseData instanceof Array ? (responseData.map((data) => new klass(data)) as T[]) : new klass(responseData)

class ApiClient {
  constructor() {}

  private getAuthToken = (): string | void =>
    'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjI0NjE2NzYxNTh9.FnuhsnKOc1iz43t10QTZkD5pQ_Qu3oTopwaX7WU9D_Q'

  // https://stackoverflow.com/questions/63313799/typescript-argument-cant-use-any-in-fetch
  private fetcher = async <T>(options: FetcherProps, klass?: any): Promise<T> => {
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
        throw new Error(`${response.status}: ${response.statusText}`)
      }

      const responseData = await response.json()

      return klass ? castToClass(responseData, klass) : responseData
    } catch (error) {
      throw new Error(`response.json() error: ${error}`)
    }
  }

  useMissions = async () => await this.fetcher<Mission[]>({ path: '/missions' })
  useMission = async (id: string) => await this.fetcher<Mission>({ path: `/missions/${id}` })

  useSoldiers = async () => await this.fetcher<Soldier[]>({ path: '/soldiers' }, Soldier)
  useSoldier = async (id: string) => await this.fetcher<Soldier>({ path: `/soldiers/${id}` }, Soldier)
}

const apiClient = new ApiClient()

export default apiClient
