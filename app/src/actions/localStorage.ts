import { Dispatch } from "redux"

export const saveStore = function () {
  return async ($: Dispatch, getState: any) => {
    const { router, ...state } = getState()
    window.localStorage.setItem('store', JSON.stringify(state))
  }
}
