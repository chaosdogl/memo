import { Middleware } from 'redux'

const asyncThunk: Middleware = ({ dispatch, getState }) => next => async action => {
  if (typeof action === 'function') {
    return action(dispatch, getState)
  }
  return next(action)
}

export default asyncThunk