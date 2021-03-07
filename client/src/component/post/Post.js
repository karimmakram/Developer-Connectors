import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { get_post_byId } from '../../redux/post/action'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
const Post = ({ match, get_post_byId, post: { post, loading } }) => {
    useEffect(() => {
        get_post_byId(match.params.id)
    }, [get_post_byId, match.params.id])
    return (
        loading || post === null ? <Spinner /> :
            <Fragment>
                <Link to='/posts' className='btn'>
                    Back to Posts
                </Link>
                <PostItem posts={[post]} showAction={false} />
                <CommentForm postId={post._id} />
                {post.comments.map(comment => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id} />
                ))}
            </Fragment>
    )
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    get_post_byId: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({ post: state.post })
export default connect(mapStateToProps, { get_post_byId })(Post)
