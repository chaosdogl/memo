import { Middleware } from 'redux'

const thunk: Middleware = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState)
  }
  return next(action)
}

export default thunk