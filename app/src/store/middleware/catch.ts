import { Middleware } from 'redux'
import { ErrorAction } from '../../actions/error'

const logger: Middleware = store => next => async action => {
  try {
    let result = await next(action)
    return result
  } catch (error) {
    next(ErrorAction(action, error.message, error.code))
    throw error
  }
}

export default logger