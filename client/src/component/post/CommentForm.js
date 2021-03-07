import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { add_comment } from '../../redux/post/action'
const CommentForm = ({ add_comment, postId }) => {
    const [text, setText] = useState('')
    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Leave a Comment</h3>
            </div>
            <form className="form my-1" onSubmit={e => {
                e.preventDefault()
                add_comment({ text }, postId)
                setText('')
            }}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="add Comment"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>

    )
}

CommentForm.propTypes = {
    add_comment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
}

export default connect(null, { add_comment })(CommentForm)
