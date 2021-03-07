import { setAlert } from '../alert/action'
import axios from 'axios'
import { GET_PROFILE, PROFILE_NOT_FOUND, APP_URL, ADD_PROFILE, UPDATE_PROFILE, DELETE_EXPERIENCE, DELETE_ACCOUNT, CLEAR_PROFILE, GET_PROFILES, GET_GITHUB_REPOS, GITHUB_REPOS_ERROR } from '../types'
import setAuthToken from '../../helper/setAuthToken'
import { getConfig } from '../../helper/configHeader'


export const get_profile = () => async dispatch => {
    setAuthToken(localStorage.token)
    axios.get(`${APP_URL}/profile/me`).then(res => {
        dispatch({ type: GET_PROFILE, data: res.data })
    }).catch(e => {
        dispatch({ type: PROFILE_NOT_FOUND, data: e })
        const errors = e.response.data
        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    })
}
export const get_profile_byId = (userId) => async dispatch => {
    setAuthToken(localStorage.token)
    axios.get(`${APP_URL}/profile/${userId}`).then(res => {
        dispatch({ type: GET_PROFILE, data: res.data })
    }).catch(e => {
        dispatch({ type: PROFILE_NOT_FOUND, data: e })
        const errors = e.response.data
        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    })
}

export const get_github_repos = (githubUsername) => async dispatch => {
    setAuthToken(localStorage.token)
    axios.get(`${APP_URL}/profile/github/${githubUsername}`).then(res => {
        dispatch({ type: GET_GITHUB_REPOS, data: res.data })
    }).catch(e => {
        dispatch({ type: GITHUB_REPOS_ERROR, data: e })
    })
}
export const get_profiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE })
    setAuthToken(localStorage.token)
    axios.get(`${APP_URL}/profile`).then(res => {
        dispatch({ type: GET_PROFILES, data: res.data })
    }).catch(e => {
        dispatch({ type: PROFILE_NOT_FOUND, data: e })
        const errors = e.response.data
        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    })
}
export const add_profile = (body, history, edit = false) => async dispatch => {
    const config = getConfig()
    setAuthToken(localStorage.token)
    try {
        const res = await axios.post(`${APP_URL}/profile`, body, config)
        dispatch(edit ? setAlert('profile Updated', 'success') : setAlert('profile Created', 'success'))
        dispatch({ type: ADD_PROFILE, data: res.data })
        history.push('/dashboard')
    } catch (e) {
        dispatch({ type: PROFILE_NOT_FOUND, data: e })
        const errors = e.response.data
        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
}

export const add_exrerience = (FormData, history) => async dispatch => {
    const config = getConfig()
    setAuthToken(localStorage.token)
    try {
        const res = await axios.put(`${APP_URL}/profile/experience`, FormData, config)
        dispatch(setAlert('experience ADDed', 'success'))
        dispatch({ type: UPDATE_PROFILE, data: res.data })
        history.push('/dashboard')
    } catch (e) {
        dispatch({ type: PROFILE_NOT_FOUND, data: e })
        const errors = e.response.data
        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
}

export const add_education = (FormData, history) => async dispatch => {
    const config = getConfig()
    setAuthToken(localStorage.token)
    try {
        const res = await axios.put(`${APP_URL}/profile/education`, FormData, config)
        dispatch(setAlert('Education ADDed', 'success'))
        dispatch({ type: UPDATE_PROFILE, data: res.data })
        history.push('/dashboard')
    } catch (e) {
        dispatch({ type: PROFILE_NOT_FOUND, data: e })
        const errors = e.response.data
        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
}

export const delete_experience = (id) => async dispatch => {
    const config = getConfig()
    setAuthToken(localStorage.token)
    try {
        const res = await axios.delete(`${APP_URL}/profile/experience/${id}`, null, config)
        dispatch(setAlert('Experience Deleted', 'success'))
        dispatch({ type: DELETE_EXPERIENCE, data: res.data })
    } catch (e) {
        console.log(e);
        dispatch({ type: PROFILE_NOT_FOUND, data: e })
        const errors = e.response.data
        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))

    }
}

export const delete_education = (id) => async dispatch => {
    const config = getConfig()
    setAuthToken(localStorage.token)
    try {
        const res = await axios.delete(`${APP_URL}/profile/education/${id}`, null, config)
        dispatch(setAlert('education Deleted', 'success'))
        dispatch({ type: DELETE_EXPERIENCE, data: res.data })
    } catch (e) {
        console.log(e);
        dispatch({ type: PROFILE_NOT_FOUND, data: e })
        const errors = e.response.data
        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))

    }
}
export const delete_Account = () => async dispatch => {
    if (window.confirm('are you sure ?')) {
        const config = getConfig()
        setAuthToken(localStorage.token)
        try {
            await axios.delete(`${APP_URL}/profile`, null, config)
            dispatch(setAlert('Account Deleted'))
            dispatch({ type: CLEAR_PROFILE })
            dispatch({ type: DELETE_ACCOUNT })
        } catch (e) {
            dispatch({ type: PROFILE_NOT_FOUND, data: e })
            const errors = e.response.data
            if (errors)
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))

        }
    }
}