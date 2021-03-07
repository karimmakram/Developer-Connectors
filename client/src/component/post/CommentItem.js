import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { delete_comment } from '../../redux/post/action'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

const CommentItem = ({ delete_comment, postId, comment: { _id, name, text, date, avatar, user }, auth }) => {
    return (
        <div class="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}>
                    <img
                        class="round-img"
                        src={avatar}
                        alt=""
                    />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p class="my-1">
                    {text}
                </p>
                <p class="post-date">
                    <Moment format='DD/MM/YYYY mm:hh'>{date}</Moment>
                </p>
                {!auth.loadinng && user === auth.user._id && (
                    <button onClick={e => delete_comment(postId, _id)}
                        type='button' className='btn btn-danger'>
                        <i className='fas fa-times'></i>
                    </button>
                )}
            </div>
        </div>
    )
}

CommentItem.propTypes = {
    delete_comment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { delete_comment })(CommentItem)
