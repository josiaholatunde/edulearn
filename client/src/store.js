import { createStore } from 'redux'
import rootReducer from './redux/reducers'
import middlewares from './middlewares'

const store = createStore(rootReducer,{}, middlewares)
export default store