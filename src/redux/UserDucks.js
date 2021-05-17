const initialData = {
    authUser: {},
    users:[]
}

const LOGIN_USER = "LOGIN_USER";

export default function userReducer(state = initialData, action) {
    switch (action.type) {
        case LOGIN_USER:
            break;

        default:
            return state;
    }
}

export const loginAction = () => (dispatch, getState) => {
    dispatch({
        type: LOGIN_USER
    });
}
