import fetch from 'cross-fetch'
import qs from 'query-string'

export interface httpClientInit {
  baseURL?: String
  headers?: HeadersInit
  requestInit?: RequestInit
}

export interface RequestInit {
  params?: object
  body?: BodyInit | null
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

const httpServerInit = {
  baseURL: '/',
  headers: {},
  requestInit: {}
}

function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    const contentType = response.headers.get('Content-Type') || ''
    if (~contentType.indexOf('application/json')) return response.json()
    else return response.text()
  } else {
    const contentType = response.headers.get('Content-Type') || ''
    if (~contentType.indexOf('application/json')) return response.json().then(res => { throw res })
    else throw new Error(response.statusText)
  }
}

class httpClient {
  private config: httpClientInit
  private headers: Headers
  private requestInit: RequestInit

  constructor(config: httpClientInit = httpServerInit, schema?: string) {

    if (schema) {
      if (schema === 'json') {
        config.headers = { ...config.headers, "Content-Type": "application/json" }
      }
    }
    this.config = config
    this.requestInit = config.requestInit || {}
    this.headers = (config.headers || {}) as Headers // cross-fetch do't support new Headers()
  }

  request(url: string, requestInit: RequestInit) {
    url = this.config.baseURL + url
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
      body,
      ...this.requestInit,
      ...restRequestInit
    }).then(checkStatus)
  }

  setHeader(HeadersInit: object) {
    this.headers = { ...this.headers, ...HeadersInit }
  }
}

export default httpClient