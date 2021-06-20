import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import userReducer from "./UserDucks";
import categoryReducer from "./CategoryDucks";


const rootReducer = combineReducers({
    user: userReducer,
    categories: categoryReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
}
