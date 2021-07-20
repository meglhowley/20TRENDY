import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import AprTrendReducer from './reducers/AprTrendReducer'
import AuthReducer from './reducers/AuthReducer'
import JanTrendReducer from './reducers/JanTrendReducer'
import JunTrendReducer from './reducers/JunTrendReducer'
import NovTrendReducer from './reducers/NovTrendReducer'
import PostReducer from './reducers/PostReducer'

const store = createStore(
  combineReducers({
    authState: AuthReducer,
    janState: JanTrendReducer,
    aprState: AprTrendReducer,
    junState: JunTrendReducer,
    novState: NovTrendReducer,
    postState: PostReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
