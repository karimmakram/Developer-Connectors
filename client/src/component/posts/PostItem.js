import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { send_like, remove_like, delete_post } from '../../redux/post/action'
const PostItem = ({ posts, auth: { user, loading }, send_like, remove_like, delete_post, showAction }) => {
    const postDiv = posts.map(post => (
        <div className="posts" key={post._id}>
            <div className="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile/${post.user}`}>
                        <img
                            className="round-img"
                            src={post.avatar}
                            alt=""
                        />
                        <h4>{post.naem}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">
                        {post.text}
                    </p>
                    <p className="post-date">
                        Posted on <Moment format="DD/MM/YYYY">{post.date}</Moment>
                    </p>
                    {
                        showAction &&
                        <Fragment>
                            <button type="button" onClick={e => send_like(post._id)} className="btn btn-light">
                                <i className="fas fa-thumbs-up"></i>{' '}
                                <span>{post.likes.length}</span>
                            </button>
                            <button type="button" onClick={e => remove_like(post._id)} className="btn btn-light">
                                <i className="fas fa-thumbs-down"></i>
                            </button>
                            <Link to={`/post/${post._id}`} className="btn btn-primary">
                                Discussion <span className='comment-count'>{post.comments.length}</span>
                            </Link>
                            {!loading && post.user === user._id && (
                                <button
                                    type="button"
                                    onClick={e => delete_post(post._id)}
                                    className="btn btn-danger">
                                    <i className="fas fa-times"></i>
                                </button>)}
                        </Fragment>
                    }
                </div>
            </div>
        </div>
    ))
    return (
        <Fragment>
            {postDiv}
        </Fragment>
    )
}

PostItem.propTypes = {
    posts: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired,
    send_like: PropTypes.func.isRequired,
    remove_like: PropTypes.func.isRequired,
    delete_post: PropTypes.func.isRequired
}
PostItem.defaultProps = {
    showAction: true
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { send_like, remove_like, delete_post })(PostItem)
