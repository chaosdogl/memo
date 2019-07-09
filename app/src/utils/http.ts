import fetch from 'cross-fetch'
import qs from 'query-string'

export interface httpClientInit {
  baseURL?: string
  headers?: HeadersInit
  requestInit?: RequestInit
}

export interface RequestInit {
  params?: { [key: string]: unknown }
  body?: BodyInit | object | null
  cache?: RequestCache
  credentials?: RequestCredentials
  headers?: HeadersInit
  integrity?: string
  keepalive?: boolean
  method?: string
  mode?: RequestMode
  redirect?: RequestRedirect
  referrer?: string
  referrerPolicy?: ReferrerPolicy
  signal?: AbortSignal | null
  window?: any
}


function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    const contentType = response.headers.get('Content-Type') || ''
    if (~contentType.indexOf('application/json')) return response.json()
    else return response.text()
  } else {
    const error: any = new Error(response.statusText)
    error.code = response.status
    const contentType = response.headers.get('Content-Type') || ''
    if (~contentType.indexOf('application/json')) {
      return response.json().then(res => {
        error.message = res.message
        throw error
      })
    } else {
      throw error
    }
  }
}

class httpClient {
  private baseURL: string
  private headers: HeadersInit
  private requestInit: RequestInit

  constructor({ baseURL = '', headers = {}, requestInit = {} }: httpClientInit, schema?: string) {
    this.baseURL = baseURL
    this.headers = { ...headers }  // cross-fetch do't support new Headers()
    this.requestInit = requestInit
  }

  request(url: string, requestInit: RequestInit) {
    url = url.includes('://') ? url : this.baseURL + url
    let { params, method, body, ...restRequestInit } = requestInit

    if (params) url += `?${qs.stringify(params)}`
    if (method === 'GET' || method === 'HEAD') {
      body = undefined
    } else {
      body = JSON.stringify(body)
    }

    return fetch(url, {
      headers: this.headers,
      method,
      ...this.requestInit,
      ...restRequestInit,
      body
    })
    .then(checkStatus)
  }

  setHeader(HeadersOpt: object) {
    this.headers = { ...this.headers, ...HeadersOpt }
  }
}

export default httpClient