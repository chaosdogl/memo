import { AnyAction } from "redux"

export interface storeError {
  message: string
  server_error_code: boolean,
  action: AnyAction
}

export function ErrorAction(action: AnyAction, error: Error | string, server_error_code?: number ) {
  return {
    type: '@error',
    error: {
      message: typeof error === 'string' ? error : error.message,
      server_error_code,
      action
    }
  }
}