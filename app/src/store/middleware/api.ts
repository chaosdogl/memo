import { Middleware } from 'redux'
import httpClient from '../../utils/http'
import { ErrorAction } from '../../actions/error'

const api = function (http: httpClient): Middleware {
  return store => next => async action => {

    if (action.api) {
      const { url, trigger, ...init } = action.api
      next(action)
      return http.request(url, init)
        .then(
          (data: JSON) => {
            next({
              type: trigger[0],
              api: action.api,
              payload: data
            })
            return data
          },
          (error) => {
            next(ErrorAction(action, error.message, error.code))
            return next({
              type: trigger[1],
              api: action.api,
              payload: action.payload
            })
          })
    }
    return next(action)
  }
}

export default api