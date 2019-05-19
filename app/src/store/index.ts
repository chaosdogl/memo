import { applyMiddleware, createStore, combineReducers, Middleware, StoreEnhancer } from 'redux'
import { createBrowserHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension'
import { routerMiddleware, connectRouter } from 'connected-react-router'

import memoReducer from '../reducers'
import thunkMiddleware from './middleware/async-thunk'
import apiMiddleware from './middleware/api'
import httpClient from '../utils/http'

const localStorageState = JSON.parse(window.localStorage.getItem('store') || '{}')
export const history = createBrowserHistory()

export interface configureStoreProps {
  reducers: object
  httpClient: httpClient
  preloadedState?: object
  enhancers?: Array<StoreEnhancer>
  middlewares?: Array<Middleware>
}

export function configureStore({
  reducers,
  preloadedState = localStorageState,
  middlewares = [],
  httpClient
}: configureStoreProps) {

  const composedModdlewares = [routerMiddleware(history), thunkMiddleware, ...middlewares]
  if (httpClient) composedModdlewares.push(apiMiddleware(httpClient))

  const middlewareEnhancer = applyMiddleware(...composedModdlewares)
  const composedEnhancers = composeWithDevTools(middlewareEnhancer)

  const reducer = combineReducers(
    Object.assign({
      router: connectRouter(history),
      meta: memoReducer,
    }, reducers))

  const store = createStore(reducer, preloadedState, composedEnhancers)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(reducer))
  }

  return store
}
