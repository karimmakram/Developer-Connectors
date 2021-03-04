import { GET_PROFILE, PROFILE_NOT_FOUND, CLEAR_PROFILE, ADD_PROFILE, UPDATE_PROFILE, DELETE_EXPERIENCE } from '../types'
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
        case (UPDATE_PROFILE):
        case (DELETE_EXPERIENCE):
            return ({ ...state, profile: data, error: '', loading: false })
        case (PROFILE_NOT_FOUND):
            return ({ ...state, profile: null, error: data, loading: false })
        case (CLEAR_PROFILE):
            return ({ ...state, profile: null, loading: false })
        default:
            return state
    }

}