import axios from 'axios'
import { setAlert } from '../alert/action'
import { GET_POSTS, POST_ERROE, APP_URL, UPDATE_LIKE, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, DELETE_COMMENT } from '../types'
import { getConfig } from '../../helper/configHeader'
// GET POSTS 

export const get_posts = () => async dispatch => {
    try {
        const res = await axios.get(`${APP_URL}/post`)
        dispatch({ type: GET_POSTS, data: res.data })
    } catch (e) {
        dispatch({ type: POST_ERROE, data: e })
        const errors = e.response.data
        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
}
export const get_post_byId = id => async dispatch => {
    try {
        const res = await axios.get(`${APP_URL}/post/${id}`)
        dispatch({ type: GET_POST, data: res.data })
    } catch (e) {
        dispatch({ type: POST_ERROE, data: e })
        const errors = e.response.data
        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
}
export const send_like = postId => async dispatch => {
    try {
        const res = await axios.put(`${APP_URL}/post/like/${postId}`)
        dispatch({ type: UPDATE_LIKE, data: { postId, newpost: res.data } })
    } catch (e) {
        dispatch({ type: POST_ERROE, data: e })
        const errors = e.response.data
        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
}
export const remove_like = postId => async dispatch => {
    try {
        const res = await axios.put(`${APP_URL}/post/unlike/${postId}`)
        dispatch({ type: UPDATE_LIKE, data: { postId, newpost: res.data } })
    } catch (e) {
        dispatch({ type: POST_ERROE, data: e })
    }
}

export const delete_post = postId => async dispatch => {
    if (window.confirm('are You sure to delete this Post ?')) {
        try {
            await axios.delete(`${APP_URL}/post/${postId}`)
            dispatch({ type: DELETE_POST, data: postId })
            dispatch(setAlert('Post Removed', 'success'))
        } catch (e) {
            dispatch({ type: POST_ERROE, data: e })
            const errors = e.response.data
            if (errors)
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}
export const add_post = formData => async dispatch => {
    const config = getConfig()
    try {
        const res = await axios.post(`${APP_URL}/post`, formData, config)
        dispatch({ type: ADD_POST, data: res.data })
        dispatch(setAlert('Post Created', 'success'))
    } catch (e) {
        dispatch({ type: POST_ERROE, data: e })
        const errors = e.response.data
        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
}
export const add_comment = (formData, postId) => async dispatch => {
    const config = getConfig()
    try {
        const res = await axios.post(`${APP_URL}/post/comment/${postId}`, formData, config)
        dispatch({ type: ADD_COMMENT, data: res.data })
        dispatch(setAlert('Comment Added', 'success'))
    } catch (e) {
        dispatch({ type: POST_ERROE, data: e })
        const errors = e.response.data
        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
}
export const delete_comment = (postId, commentId) => async dispatch => {
    try {
        const res = await axios.delete(`${APP_URL}/post/comment/${postId}/${commentId}`)
        dispatch({ type: DELETE_COMMENT, data: res.data })
        dispatch(setAlert('Comment removed', 'success'))
    } catch (e) {
        dispatch({ type: POST_ERROE, data: e })
        const errors = e.response.data
        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
}