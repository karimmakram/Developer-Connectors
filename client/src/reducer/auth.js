import { REGISTER_SUCCESS, REGISTER_FAIL } from "../action/types";
const inatialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null

}

export default function auth(state = inatialState, action) {
    const { type, data } = action
    switch (type) {
        case REGISTER_SUCCESS:
            localStorage.setItem('token', data.token)
            return { ...state, ...data, isAuthenticated: true, loading: false }
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return { ...state, token: null, user: null, isAuthenticated: null, loading: false, }
        default:
            return state
    }
}