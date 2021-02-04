import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../action/types";
const inatialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null

}

export default function auth(state = inatialState, action) {
    const { type, data } = action
    switch (type) {
        case USER_LOADED:
            return { ...state, user: data, isAuthenticated: true, loading: false }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', data.token)
            return { ...state, ...data, isAuthenticated: true, loading: false }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token')
            return { ...state, token: null, user: null, isAuthenticated: null, loading: false, }
        default:
            return state
    }
}