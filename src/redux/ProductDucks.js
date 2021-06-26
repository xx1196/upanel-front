import {gql} from "apollo-boost";
import {exportApolloClient} from "../utils/helpers";

const initialData = {
    fetching: false,
    data: [],
    product: {
        name: '',
        code: '',
        description: '',
        price: 0.0,
        categories: []
    },
    all_categories: [],
    pagination: {
        currentPage: 0,
        hasMorePages: false,
        lastPage: 0,
        total: 0,
    },
    error: null
}


const apolloClient = exportApolloClient();

const FETCHING_PRODUCTS = "FETCHING_PRODUCTS";
const FETCHING_PRODUCTS_SUCCESS = "FETCHING_PRODUCTS_SUCCESS";
const FETCHING_PRODUCTS_ERROR = "FETCHING_PRODUCTS_ERROR";

const FETCHING_PRODUCT = "FETCHING_PRODUCT";
const FETCHING_PRODUCT_SUCCESS = "FETCHING_PRODUCT_SUCCESS";
const FETCHING_PRODUCT_ERROR = "FETCHING_PRODUCT_ERROR";

const CREATING_PRODUCT = "CREATING_PRODUCT";
const CREATING_PRODUCT_SUCCESS = "CREATING_PRODUCT_SUCCESS";
const CREATING_PRODUCT_ERROR = "CREATING_PRODUCT_ERROR";

const UPDATING_PRODUCT = "UPDATING_PRODUCT";
const UPDATING_PRODUCT_SUCCESS = "UPDATING_PRODUCT_SUCCESS";
const UPDATING_PRODUCT_ERROR = "UPDATING_PRODUCT_ERROR";

const DELETING_CATEGORY = "DELETING_CATEGORY";
const DELETING_CATEGORY_SUCCESS = "DELETING_CATEGORY_SUCCESS";
const DELETING_CATEGORY_ERROR = "DELETING_CATEGORY_ERROR";

export default function productReducer(state = initialData, action) {
    switch (action.type) {
        case FETCHING_PRODUCTS:
            return {...state, fetching: true}
        case FETCHING_PRODUCTS_SUCCESS:
            return {...state, fetching: false, data: action.payload.data, pagination: action.payload.paginatorInfo}
        case FETCHING_PRODUCTS_ERROR:
            return {...state, fetching: false, error: action.payload}

        case FETCHING_PRODUCT:
            return {...state, fetching: true}
        case FETCHING_PRODUCT_SUCCESS:
            return {
                ...state,
                fetching: false,
                product: action.payload.product,
                all_categories: action.payload.allCategories
            }
        case FETCHING_PRODUCT_ERROR:
            return {...state, fetching: false, error: action.payload}

        case CREATING_PRODUCT:
            return {...state, fetching: true}
        case CREATING_PRODUCT_SUCCESS:
            return {...state, fetching: false, product: action.payload.createProduct}
        case CREATING_PRODUCT_ERROR:
            return {...state, fetching: false, error: action.payload}

        case UPDATING_PRODUCT:
            return {...state, fetching: true}
        case UPDATING_PRODUCT_SUCCESS:
            return {...state, fetching: false, product: action.payload.updateProduct}
        case UPDATING_PRODUCT_ERROR:
            return {...state, fetching: false, error: action.payload}

        case DELETING_CATEGORY:
            return {...state, fetching: true}
        case DELETING_CATEGORY_SUCCESS:
            return {...state, fetching: false, data: []}
        case DELETING_CATEGORY_ERROR:
            return {...state, fetching: false, error: action.payload}

        default:
            return state;
    }
}

export const fetchProductsAction = (page = 1) => (dispatch, getState) => {
    dispatch({
        type: FETCHING_PRODUCTS
    });

    let query = gql`
        query products($page: Int!) {
            products(first: 5, page: $page) {
                paginatorInfo {
                    currentPage
                    hasMorePages
                    lastPage
                    total
                }
                data {
                    id
                    name
                    code
                    description
                    price
                }
            }
        }
    `;
    apolloClient.query({
        query,
        fetchPolicy: 'network-only',
        variables: {
            page
        },
    }).then(({data}) => {

            dispatch({
                type: FETCHING_PRODUCTS_SUCCESS,
                payload: data.products
            });
        }
    ).catch(error => {
        dispatch({
            type: FETCHING_PRODUCTS_ERROR,
            payload: error
        });
    });
}


export const fetchProductAction = (id) => (dispatch, getState) => {
    dispatch({
        type: FETCHING_PRODUCT
    });

    let query = gql`
        query product($id: ID!) {
            product(id: $id) {
                name
                code
                description
                price
                categories {
                    id
                    name
                }
            }
            allCategories {
                id
                name
            }
        }
    `;
    apolloClient.query({
        query,
        fetchPolicy: 'network-only',
        variables: {
            id
        },
    }).then(({data}) => {

            dispatch({
                type: FETCHING_PRODUCT_SUCCESS,
                payload: data
            });
        }
    ).catch(error => {
        dispatch({
            type: FETCHING_PRODUCT_ERROR,
            payload: error
        });
    });
}

export const createProductAction = (name, code, description, price, categories) => (dispatch, getState) => {
    debugger;
    categories = categories.map(({value: id}) => {
        return id;
    });
debugger;
    dispatch({
        type: CREATING_PRODUCT
    });

    let mutation = gql`
        mutation createProduct(
            $name: String!
            $code: String!
            $description: String
            $price: Float!
            $categories: [ID!]!
        ) {
            createProduct(
                input: {
                    name: $name
                    code: $code
                    description: $description
                    price: $price
                    categories: $categories
                }
            ) {
                name
                code
                description
                price
                categories {
                    id
                    name
                }
            }
        }
    `;
    apolloClient.mutate({
        mutation,
        variables: {
            name,
            code,
            description,
            price,
            categories
        },
    }).then(({data}) => {
            dispatch({
                type: CREATING_PRODUCT_SUCCESS,
                payload: data
            });
        }
    ).catch(error => {
        dispatch({
            type: CREATING_PRODUCT_ERROR,
            payload: error
        });
    });
}

export const updateProductAction = (id, name, code, description, price, categories) => (dispatch, getState) => {
    categories = categories.map(({value: id}) => {
        return id;
    });

    dispatch({
        type: UPDATING_PRODUCT
    });

    let mutation = gql`
        mutation updateProduct(
            $id: ID!
            $name: String
            $code: String
            $description: String
            $price: Float
            $categories:[String!]
        ) {
            updateProduct(
                id: $id
                input: {
                    name: $name
                    code: $code
                    description: $description
                    price: $price
                    categories:$categories
                }
            )  {
                name
                code
                description
                price
                categories {
                    id
                    name
                }
            }
        }
    `;
    apolloClient.mutate({
        mutation,
        variables: {
            id,
            name,
            code,
            description,
            price,
            categories
        },
    }).then(({data}) => {
            dispatch({
                type: UPDATING_PRODUCT_SUCCESS,
                payload: data
            });
        }
    ).catch(error => {
        dispatch({
            type: UPDATING_PRODUCT_ERROR,
            payload: error
        });
    });
}

export const deleteProductAction = (id) => (dispatch, getState) => {
    dispatch({
        type: DELETING_CATEGORY
    });

    let query = gql`
        query deleteProduct($id: ID!) {
            deleteCategory(id: $id) {
                name
            }
        }
    `;
    apolloClient.query({
        query,
        variables: {
            id
        },
    }).then(({data}) => {
            dispatch({
                type: DELETING_CATEGORY_SUCCESS,
                payload: data
            });
        }
    ).catch(error => {
        dispatch({
            type: DELETING_CATEGORY_ERROR,
            payload: error
        });
    });
}

