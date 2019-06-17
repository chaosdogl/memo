export interface User {
  id: string,
  [name: string]: any
}

export const toggle_user = 'TOGGLE_USER'

export const toggleUser = function (user: User) {
  return {
    type: toggle_user,
    payload: user
  }
}

export const clear_user = 'CLEAR_USER'