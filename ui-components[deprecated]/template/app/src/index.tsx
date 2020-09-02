import './style/main.sass'
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'
import { Switch, Route } from './Router'
import { configureStore } from './store'

const store = configureStore()
const Home = () => <h1>Home</h1>
const Error404 = () => <h1>Error/404</h1>

const Routes = function () {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route component={Error404} />
    </Switch>
  )
}

ReactDOM.render(<Root store={store} Routes={Routes} />, document.getElementById('mome'))