import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import AuthReducer from './reducers/AuthReducer'
import JanTrendReducer from './reducers/JanTrendReducer'

const store = createStore(
  combineReducers({ authState: AuthReducer, janState: JanTrendReducer}),
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
