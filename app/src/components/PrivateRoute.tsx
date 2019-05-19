import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { StoreState } from '../typings/index'

export interface PrivateRouteProps {
  component: any,
  redirect: any
  isAuthenticated: boolean
}

function PrivateRoute({ component: Component, redirect: Redirect, isAuthenticated, ...rest }: PrivateRouteProps) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component />
        ) : (
            <Redirect />
          )
      }
    />
  )
}

export default connect(({ meta }: StoreState) => ({
  isAuthenticated: !!meta.auth.isAuthenticated
}))(PrivateRoute)