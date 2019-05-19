import { Middleware } from 'redux'
import httpClient from '../../utils/http'

const api = function (http: httpClient): Middleware {
  return store => next => async action => {
    if (action.api) {
      const { url, handle, ...init } = action.api
      next(action)
      return http.request(url, init)
        .then((res: JSON) => {
          return next({
            type: handle[0],
            payload: res
          })
        })
        .catch((err: Error) => {
          next({
            type: handle[1],
            payload: err
          })
          throw err
        })
    }
    return next(action)
  }
}

export default api