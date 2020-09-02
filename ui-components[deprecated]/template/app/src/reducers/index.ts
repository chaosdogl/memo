import { combineReducers } from 'redux'
import auth, { authState } from './auth'

export interface reducerState {
  auth: authState,
}

export default combineReducers({
  auth,
})