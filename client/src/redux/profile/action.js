import { setAlert } from '../alert/action'
import axios from 'axios'
import { GET_PROFILE, PROFILE_NOT_FOUND, APP_URL, ADD_PROFILE, UPDATE_PROFILE } from '../types'
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
