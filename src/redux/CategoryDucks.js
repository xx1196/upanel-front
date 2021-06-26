import {gql} from "apollo-boost";
import {exportApolloClient} from "../utils/helpers";

const initialData = {
    fetching: false,
    data: [],
    category: {
        name: '',
        description: '',
        products: []
    },
    pagination: {
        currentPage: 0,
        hasMorePages: false,
        lastPage: 0,
        total: 0,
    },
    error: null
}


const apolloClient = exportApolloClient();

const FETCHING_CATEGORIES = "FETCHING_CATEGORIES";
const FETCHING_CATEGORIES_SUCCESS = "FETCHING_CATEGORIES_SUCCESS";
const FETCHING_CATEGORIES_ERROR = "FETCHING_CATEGORIES_ERROR";

const FETCHING_CATEGORY = "FETCHING_CATEGORY";
const FETCHING_CATEGORY_SUCCESS = "FETCHING_CATEGORY_SUCCESS";
const FETCHING_CATEGORY_ERROR = "FETCHING_CATEGORY_ERROR";

const UPDATING_CATEGORY = "UPDATING_CATEGORY";
const UPDATING_CATEGORY_SUCCESS = "UPDATING_CATEGORY_SUCCESS";
const UPDATING_CATEGORY_ERROR = "UPDATING_CATEGORY_ERROR";

const DELETING_CATEGORY = "DELETING_CATEGORY";
const DELETING_CATEGORY_SUCCESS = "DELETING_CATEGORY_SUCCESS";
const DELETING_CATEGORY_ERROR = "DELETING_CATEGORY_ERROR";

export default function categoryReducer(state = initialData, action) {
    switch (action.type) {
        case FETCHING_CATEGORIES:
            return {...state, fetching: true}
        case FETCHING_CATEGORIES_SUCCESS:
            return {...state, fetching: false, data: action.payload.data, pagination: action.payload.paginatorInfo}
        case FETCHING_CATEGORIES_ERROR:
            return {...state, fetching: false, error: action.payload}

        case FETCHING_CATEGORY:
            return {...state, fetching: true}
        case FETCHING_CATEGORY_SUCCESS:
            return {...state, fetching: false, category: action.payload.category}
        case FETCHING_CATEGORY_ERROR:
            return {...state, fetching: false, error: action.payload}

        case UPDATING_CATEGORY:
            return {...state, fetching: true}
        case UPDATING_CATEGORY_SUCCESS:
            return {...state, fetching: false, category: action.payload.updateCategory}
        case UPDATING_CATEGORY_ERROR:
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

export const fetchCategoriesAction = (page = 1) => (dispatch, getState) => {
    dispatch({
        type: FETCHING_CATEGORIES
    });

    let query = gql`
        query categories($page: Int!) {
            categories(first: 5, page: $page) {
                paginatorInfo {
                    currentPage
                    hasMorePages
                    lastPage
                    total
                }
                data {
                    id
                    name
                    description
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
                type: FETCHING_CATEGORIES_SUCCESS,
                payload: data.categories
            });
        }
    ).catch(error => {
        dispatch({
            type: FETCHING_CATEGORIES_ERROR,
            payload: error
        });
    });
}

export const fetchCategoryAction = (id) => (dispatch, getState) => {
    dispatch({
        type: FETCHING_CATEGORY
    });

    let query = gql`
        query category($id: ID!) {
            category(id: $id) {
                name
                description
                products {
                    name
                }
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
                type: FETCHING_CATEGORY_SUCCESS,
                payload: data
            });
        }
    ).catch(error => {
        dispatch({
            type: FETCHING_CATEGORY_ERROR,
            payload: error
        });
    });
}


export const updateCategoryAction = (id, name, description) => (dispatch, getState) => {
    dispatch({
        type: UPDATING_CATEGORY
    });

    let mutation = gql`
        mutation updateCategory($id: ID!, $name: String, $description: String) {
            updateCategory(id: $id, input: { name: $name, description: $description }) {
                name
                description
                products{
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
            description
        },
    }).then(({data}) => {
            dispatch({
                type: UPDATING_CATEGORY_SUCCESS,
                payload: data
            });
        }
    ).catch(error => {
        dispatch({
            type: UPDATING_CATEGORY_ERROR,
            payload: error
        });
    });
}


export const deleteCategoryAction = (id) => (dispatch, getState) => {
    dispatch({
        type: DELETING_CATEGORY
    });

    let query = gql`
        query deleteCategory($id: ID!) {
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

