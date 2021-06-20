import {gql} from "apollo-boost";
import {exportApolloClient} from "../utils/helpers";

const initialData = {
    fetching: false,
    accessToken: localStorage.getItem("access_token"),
    authUser: {},
    users: []
}

const apolloClient = exportApolloClient();

const LOGIN_USER = "LOGIN_USER";
const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";

export default function userReducer(state = initialData, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, fetching: true}
        case LOGIN_USER_SUCCESS:
            return {...state, fetching: false, accessToken: action.payload}
        case LOGIN_USER_ERROR:
            return {...state, fetching: false, error: action.payload}
        default:
            return state;
    }
}

export const loginAction = (email, password) => (dispatch, getState) => {
    dispatch({
        type: LOGIN_USER
    });

    let mutation = gql`
    mutation ($email: String!, $password: String!) {
  login(input: { username: $email, password: $password }) {
    access_token
  }
  }`;

    apolloClient.mutate({
        mutation,
        variables: {email, password}
    })
        .then(({data}) => {
                let accessToken = data.login.access_token;
                localStorage.setItem('access_token', accessToken)

                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: accessToken
                });
            }
        ).catch(error => {
        dispatch({
            type: LOGIN_USER_ERROR,
            payload: error
        });
    });
}
