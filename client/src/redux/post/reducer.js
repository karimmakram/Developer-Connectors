import { GET_POSTS, POST_ERROE, UPDATE_LIKE, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, DELETE_COMMENT } from '../types'
const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: null
}
export default function post(state = initialState, action) {
    const { type, data } = action
    switch (type) {
        case (GET_POSTS):
            return ({ ...state, loading: false, posts: data })
        case (GET_POST):
            return ({ ...state, loading: false, post: data })
        case (ADD_POST):
            return ({ ...state, posts: [data, ...state.posts], loading: false })
        case (UPDATE_LIKE):
            return ({
                ...state,
                posts: state.posts.map(post => post._id === data.postId ? data.newpost : post),
                loading: false
            })

        case (ADD_COMMENT):
        case (DELETE_COMMENT):
            return ({ ...state, post: data, loading: false })
        case (DELETE_POST):
            return ({
                ...state,
                posts: state.posts.filter(post => post._id !== data),
                loading: false
            })

        case (POST_ERROE):
            return ({ ...state, loading: false, error: data })
        default:
            return state
    }
}