import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reducerState } from '../reducers'

export interface User {
  id: string,
  [name: string]: any
}

export const update_auth = 'UPDATE_AUTH'
export const clear_auth = 'CLEAR_AUTH'

export const auth = function (user: User | null) {
  if (user) {
    return {
      type: update_auth,
      payload: user
    }
  } else {
    return {
      type: clear_auth,
      payload: user
    }
  }
}

export const clear_user = 'CLEAR_USER'

export default function useAuth () {
  const dispatch = useDispatch()
  const user = useSelector(({ auth }: reducerState) => auth.user )

  const bindAuth = useCallback(
    (u: User | null) => {
      dispatch(auth(u))
    },
    [dispatch]
  )

  return [user, bindAuth]
}