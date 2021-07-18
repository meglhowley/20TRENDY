import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import AuthReducer from './reducers/AuthReducer'
import JanTrendReducer from './reducers/JanTrendReducer'
import PostReducer from './reducers/PostReducer'

const store = createStore(
  combineReducers({
    authState: AuthReducer,
    janState: JanTrendReducer,
    postState: PostReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
