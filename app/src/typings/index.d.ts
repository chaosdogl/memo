import { Action } from 'redux'
import { reducerState } from '../reducers'

export interface StoreState {
  meta: reducerState,
  router: {
    location: {
      pathname: string,
      search: string,
      hash: string,
      key: string
    }
    action: string
  }
}

export interface Error {
  code: Number,
  message: String,
  body?: any
}

export interface Action extends Action {
  type: String,
  payload: any,
  error?: Error,
  api?: RequestInit
}