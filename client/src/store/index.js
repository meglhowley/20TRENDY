import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import AuthReducer from './reducers/AuthReducer'

const store = createStore(
  combineReducers({ authState: AuthReducer }),
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
