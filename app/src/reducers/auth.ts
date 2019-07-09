import { AnyAction } from 'redux'
import { update_auth, clear_user, User} from '../actions/auth'

export interface authState {
  isAuthenticated: boolean
  user: User | null
}

const initState : authState = { isAuthenticated: false, user: null }
function auth(state = initState, action: AnyAction) {
  switch (action.type) {
    case update_auth:
      return { isAuthenticated: true, user: action.payload }
    case clear_user:
      return { isAuthenticated: false, user: null }
    default:
      return state
  }
}

export default auth