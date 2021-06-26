import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import userReducer from "./UserDucks";
import categoryReducer from "./CategoryDucks";
import productReducer from "./ProductDucks";


const rootReducer = combineReducers({
    user: userReducer,
    categories: categoryReducer,
    products: productReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
}
