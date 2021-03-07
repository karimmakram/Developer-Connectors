import React, { useState } from 'react'
import { connect } from 'react-redux'
import { add_post } from '../../redux/post/action'
import PropTypes from 'prop-types'
const PostForm = ({ add_post }) => {
    const [text, setText] = useState('')
    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Write Post...</h3>
            </div>
            <form className="form my-1" onSubmit={e => {
                e.preventDefault()
                add_post({ text })
                setText('')
            }}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Create a post"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>

    )
}
PostForm.propTypes = {
    add_post: PropTypes.func.isRequired,
}
export default connect(null, { add_post })(PostForm)
