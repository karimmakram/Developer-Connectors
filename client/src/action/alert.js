import { SET_ALERT, REMOVE_ALERT } from "./types"
export const setAlert = (msg, alertType) => dispatch => {
    const id = Date.now().toString()
    dispatch({
        type: SET_ALERT,
        data: { msg, alertType, id }
    })

    setTimeout(() => dispatch({ type: REMOVE_ALERT, data: id }), 3000)
}