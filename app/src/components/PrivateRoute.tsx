import React from 'react'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import { StoreState } from '../typings/index'

export interface PrivateRouteProps {
  component: any,
  redirect: any
}

function PrivateRoute({ component: Component, redirect: Redirect, ...rest }: PrivateRouteProps) {
  const isAuthenticated = useSelector(({ meta }: StoreState) => meta.auth.isAuthenticated)

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

export default PrivateRoute