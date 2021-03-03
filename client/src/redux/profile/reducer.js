import { GET_PROFILE, PROFILE_NOT_FOUND, CLEAR_PROFILE, ADD_PROFILE } from '../types'
const initState = {
    loading: true,
    profile: null,
    profiles: [],
    repos: [],
    error: ''
}
export default function profile(state = initState, action) {
    const { type, data } = action
    switch (type) {
        case (GET_PROFILE):
        case (ADD_PROFILE):
            return ({ ...state, profile: data, error: '', loading: false })
        case (PROFILE_NOT_FOUND):
            return ({ ...state, profile: null, error: data, loading: false })
        case (CLEAR_PROFILE):
            return ({ ...state, profile: null, loading: false })
        default:
            return state
    }

}