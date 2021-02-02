import { REGISTER_FAIL, REGISTER_SUCCESS } from "./types";
import axios from 'axios'
import { setAlert } from "./alert";

export const register = ({ body }) => async dispatch => {
    console.log(body.avatar);

    const config = {
        headers: {
            'Content-Type': 'Application/json',
        }
    }

    try {

        const res = await axios.post('http://localhost:3006/user', body, config)
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