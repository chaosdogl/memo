import { Dispatch } from "redux"

export const saveStore = function (key = 'store') {
  return async (D: Dispatch, getState: any) => {
    const { router, ...state } = getState()
    window.localStorage.setItem('store', JSON.stringify(state))
  }
}
