import {gql} from "apollo-boost";
import {exportApolloClient} from "../utils/helpers";

const initialData = {
    fetching: false,
    accessToken: localStorage.getItem("access_token"),
    authUser: {
        name: "",
        email: "",
        avatar: ""
    },
    users: []
}

const apolloClient = exportApolloClient();

const LOGIN_USER = "LOGIN_USER";
const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";

const GET_ME = "GET_ME";
const GET_ME_SUCCESS = "GET_ME_SUCCESS";
const GET_ME_ERROR = "GET_ME_ERROR";

const LOGIN_GOOGLE_USER = "LOGIN_GOOGLE_USER";
const LOGIN_GOOGLE_USER_SUCCESS = "LOGIN_GOOGLE_USER_SUCCESS";
const LOGIN_GOOGLE_USER_ERROR = "LOGIN_GOOGLE_USER_ERROR";

export default function userReducer(state = initialData, action) {
    switch (action.type) {
        case LOGIN_USER:
        case LOGIN_GOOGLE_USER:
        case GET_ME:
            return {...state, fetching: true}
        case LOGIN_USER_SUCCESS:
        case LOGIN_GOOGLE_USER_SUCCESS:
            return {...state, fetching: false, accessToken: action.payload}
        case LOGIN_USER_ERROR:
        case LOGIN_GOOGLE_USER_ERROR:
        case GET_ME_ERROR:
            return {...state, fetching: false, error: action.payload}
        case GET_ME_SUCCESS:
            return {...state, fetching: false, authUser: action.payload}
        default:
            return state;
    }
}

export const getMeAction = () => (dispatch, getState) => {
    dispatch({
        type: GET_ME
    });

    let query = gql`
        query {
            me {
                user {
                    name
                    email
                    avatar
                }
            }
        }`;

    apolloClient.query({
        query,
    })
        .then(({data}) => {
                dispatch({
                    type: GET_ME_SUCCESS,
                    payload: data.me.user
                });
            }
        ).catch(error => {
        dispatch({
            type: GET_ME_ERROR,
            payload: error
        });
    });
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

export const socialLoginAction = (provider, accessToken) => (dispatch, getState) => {
    dispatch({
        type: LOGIN_GOOGLE_USER
    });

    let mutation = gql`
        mutation($accessToken: String!, $provider: String!) {
            socialLogin(input: { provider: $provider, token: $accessToken }) {
                access_token
            }
        }`;

    apolloClient.mutate({
        mutation,
        variables: {provider, accessToken}
    })
        .then(({data}) => {
                let accessToken = data.socialLogin.access_token;
                localStorage.setItem('access_token', accessToken)

                dispatch({
                    type: LOGIN_GOOGLE_USER_SUCCESS,
                    payload: accessToken
                });
            }
        ).catch(error => {
        dispatch({
            type: LOGIN_GOOGLE_USER_ERROR,
            payload: error
        });
    });
}
