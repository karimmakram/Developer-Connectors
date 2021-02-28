import { Router } from 'express'
import Auth from '../middleware/auth'
import { check } from 'express-validator'
export const postRoute = Router()
import postCn from '../controllers/Cn_post'

postRoute.post('/post', [check('text', 'cant send empty comment').not().isEmpty()], Auth, postCn.addPost)
postRoute.get('/post/:id', Auth, postCn.getPost)
postRoute.delete('/post/:id', Auth, postCn.deletePost)
postRoute.get('/post', postCn.getAllPosts)

//send like to post
postRoute.put('/post/like/:id', Auth, postCn.sendLike)
postRoute.put('/post/unlike/:id', Auth, postCn.UnlikePost)

// add comment to post {sned postId}
postRoute.post('/post/comment/:id', [check('text', 'cant send empty comment').not().isEmpty()], Auth, postCn.addComment)

// delete comment {send postid and comment id }
postRoute.delete('/post/comment/:postId/:commentId', Auth, postCn.deleteComment)


