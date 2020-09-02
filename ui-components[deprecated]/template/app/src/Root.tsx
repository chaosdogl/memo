import React from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { Router } from './Router'

export interface Props {
  store: Store,
  Routes: () => JSX.Element
}

function Root({ store, Routes }: Props) {
  return (
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  )
}

export default Root
