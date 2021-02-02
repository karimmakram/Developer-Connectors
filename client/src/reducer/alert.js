import { SET_ALERT, REMOVE_ALERT } from '../action/types'
const initalState = []

export default function alert(state = initalState, action) {
    const { type, data } = action
    switch (type) {
        case SET_ALERT:
            return ([...state, data])
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== data)
        default:
            return state
    }
}