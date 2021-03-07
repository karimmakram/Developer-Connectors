import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { get_posts } from '../../redux/post/action'
import PostItem from './PostItem'
import PostForm from './PostForm'
const Posts = ({ post: { posts, loading }, get_posts }) => {
    useEffect(() => {
        get_posts()
    }, [get_posts])

    return (
        loading ? <Spinner /> :
            <Fragment>

                <h1 className="large text-primary">
                    Posts
                </h1>
                <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>
                <PostForm />
                <PostItem posts={posts} />

            </Fragment>
    )
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    get_posts: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    post: state.post
})
export default connect(mapStateToProps, { get_posts })(Posts)
