import React from 'react'
import { history } from './store'
import { ConnectedRouter } from 'connected-react-router'

export * from './components/PrivateRoute'
export { Route, Switch } from 'react-router-dom'

export const Router = function ({ children }: any) {
  return (
    <ConnectedRouter history={ history } >
      { children }
    </ConnectedRouter>
  )
}