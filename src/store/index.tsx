import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import builder from './reducers/builder'
import order from './reducers/order'

const composeEnhancers = (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducer = combineReducers({
  builder,
  order,
})
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

export type AppState = ReturnType<typeof reducer>

export default store