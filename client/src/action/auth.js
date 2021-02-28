import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, APP_URL } from "./types";
import axios from 'axios'
import { setAlert } from "./alert";
import setAuthToken from "../helper/setAuthToken";

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get(`${APP_URL}/userauth`)
        dispatch({ type: USER_LOADED, data: res.data })
        // dispatch(loadUser())
    } catch (error) {

        dispatch({ type: AUTH_ERROR })
    }
}

export const register = ({ body }) => async dispatch => {
    console.log(body.avatar);

    const config = {
        headers: {
            'Content-Type': 'Application/json',
        }
    }

    try {

        const res = await axios.post(`${APP_URL}/user`, body, config)
        console.log(res.data);
        dispatch({
            type: REGISTER_SUCCESS,
            data: res.data
        })
        dispatch(setAlert('user added', 'success'))
    } catch (e) {
        console.log(e.response.data);

        const errors = e.response.data
        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        dispatch({ type: REGISTER_FAIL })
    }
}

export const login = ({ body }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'Application/json',
        }
    }
    try {
        const res = await axios.post(`${APP_URL}/login`, body, config)
        console.log(res.data);

        dispatch({ type: LOGIN_SUCCESS, data: res.data })
    } catch (E) {

        const errors = E.response.data
        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        dispatch({ type: LOGIN_FAIL })
    }
}

export const Logout = () => dispatch => {
    dispatch({ type: LOGOUT })
}