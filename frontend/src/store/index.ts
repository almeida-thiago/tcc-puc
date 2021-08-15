import { createStore, combineReducers, compose } from 'redux'
import user from './user'
import alert from './alerts'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  user, alert
})

export default createStore(rootReducer, composeEnhancers())
