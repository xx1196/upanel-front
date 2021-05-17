import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import userReducer from "./UserDucks";


const rootReducer = combineReducers({
    user: userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
}
