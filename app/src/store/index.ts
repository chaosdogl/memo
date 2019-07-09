import { applyMiddleware, createStore, combineReducers, Middleware } from 'redux'
import { createBrowserHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension'
import { routerMiddleware, connectRouter } from 'connected-react-router'

import memoReducer from '../reducers'
import thunkMiddleware from './middleware/thunk'
import apiMiddleware from './middleware/api'
import catchMiddleware from './middleware/catch'
import httpProxy from '../utils/http'

export const history = createBrowserHistory()

export interface configureStoreProps {
  apiProxy?: httpProxy
  reducers?: object
  preloadedState?: object
  middlewares?: Array<Middleware>
}

export function configureStore({
  apiProxy,
  reducers = {},
  preloadedState = {},
  middlewares = [],
}: configureStoreProps = {}) {
  if (!apiProxy) apiProxy = new httpProxy({ baseURL: '/api', requestInit: { credentials: 'include' }, headers: { "Content-Type": "application/json" }})

  const composedModdlewares = [catchMiddleware, routerMiddleware(history), thunkMiddleware, apiMiddleware(apiProxy), ...middlewares]
  const middlewareEnhancer = applyMiddleware(...composedModdlewares)
  const composedEnhancers = composeWithDevTools(middlewareEnhancer)

  const reducer = combineReducers({
    router: connectRouter(history),
    meta: memoReducer,
    ...reducers
  })

  const store = createStore(reducer, preloadedState, composedEnhancers)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(reducer))
  }

  return store
}
