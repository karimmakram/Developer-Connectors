import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { postModel } from '../Models/posts'
import mongoose from 'mongoose'
import { Comment } from '../Models/classes/comment'
import config from 'config'
import { User } from '../Models/users'

class postController {

    getAvatarUrl = (user: User) => {
        return `${config.get('Url')}/userAvatar/${user._id}`
    }

    addPost = async (req: Request, res: Response) => {
        const error = validationResult(res)
        if (!error.isEmpty())
            return res.status(400).send(error.array())
        const user = req.user
        const { text }: { text: string } = req.body
        try {
            const post = new postModel({ text, avatar: this.getAvatarUrl(user), name: user.name, user: user._id })
            await post.save()
            res.send(post)
        } catch (error) {
            res.status(500).send([{ msg: error.message }])
        }

    }

    getPost = async (req: Request, res: Response) => {
        const _id = req.params.id
        try {
            const post = await postModel.findOne({ _id })
            if (!post)
                return res.status(400).send('post not found  ')
            res.send(post)
        } catch (error) {
            if (error.kind === 'ObjectId')
                return res.status(500).send([{ msg: 'send vaild id' }])
            res.status(500).send([{ msg: error.message }])
        }
    }

    deletePost = async (req: Request, res: Response) => {
        const _id = req.params.id
        try {
            const post = await postModel.findOneAndDelete({ _id, user: req.user._id })
            if (!post)
                return res.status(400).send('cant find post or you dont have permsion to delet post')
            res.send('post deleted')
        } catch (error) {
            if (error.kind === 'ObjectId')
                return res.status(500).send([{ msg: 'post not found ' }])
            res.status(500).send([{ msg: error.message }])
        }
    }

    getAllPosts = async (req: Request, res: Response) => {
        try {
            const posts = await postModel.find({}).sort({ date: -1 })
            res.send(posts)
        }

        catch (error) {

            res.status(500).send([{ msg: error.message }])
        }
    }

    sendLike = async (req: Request, res: Response) => {
        const postId = req.params.id
        try {
            const post = await postModel.findById(postId)
            if (!post)
                return res.status(400).send([{ msg: 'post not found' }])
            if (post.likes) {
                console.log(post.likes.length);
                if (post.likes.filter(like => `${like.user}` === `${req.user._id}`).length > 0)
                    return res.status(400).send([{ msg: 'post already liked' }])
                post.likes = [{ _id: mongoose.Types.ObjectId(), user: req.user._id }, ...post.likes]
                await post.save()
                res.send(post)
            } else {
                res.status(500).send([{ msg: 'server error' }])
            }
        } catch (error) {

            if (error.kind === 'ObjectId')
                return res.status(500).send([{ msg: 'post not found ' }])
            res.status(500).send([{ msg: error.message }])
        }
    }

    UnlikePost = async (req: Request, res: Response) => {
        const postId = req.params.id
        try {
            const post = await postModel.findById(postId)
            if (!post)
                return res.status(400).send([{ msg: 'post not found' }])
            if (post.likes) {
                if (post.likes.filter(like => `${like.user}` === `${req.user._id}`).length === 0)
                    return res.status(400).send([{ msg: 'post has not yet have been liked' }])
                post.likes = post.likes.filter(like => like.user === req.user._id)
                await post.save()
                res.send(post)
            } else {
                res.status(500).send([{ msg: 'server error' }])
            }
        } catch (error) {

            if (error.kind === 'ObjectId')
                return res.status(500).send([{ msg: 'post not found ' }])
            res.status(500).send([{ msg: error.message }])
        }
    }

    addComment = async (req: Request, res: Response) => {
        const error = validationResult(res)
        if (!error.isEmpty())
            return res.status(400).send(error.array())
        const user = req.user
        const { text }: { text: string } = req.body
        const comment: Comment = {
            _id: mongoose.Types.ObjectId(),
            text,
            user: user._id,
            avatar: this.getAvatarUrl(user),
            name: user.name,
            date: new Date()
        }
        try {
            const post = await postModel.findById(req.params.id)
            if (!post)
                return res.status(400).send([{ msg: 'post not found' }])
            if (post.comments) {
                post.comments = [comment, ...post.comments]
                await post.save()
                res.send(post)
            } else {
                res.status(500).send([{ msg: 'server error' }])
            }
        } catch (error) {
            if (error.kind === 'ObjectId')
                return res.status(500).send([{ msg: 'post not found ' }])
            res.status(500).send([{ msg: error.message }])
        }

    }

    deleteComment = async (req: Request, res: Response) => {
        const { postId, commentId } = req.params

        try {
            const post = await postModel.findById(postId)
            if (!post)
                return res.status(400).send([{ msg: 'post not found' }])
            if (post.comments) {
                let indexof = -1
                const comment = post.comments.find((comment, index) => {
                    if (`${comment._id}` === commentId) {
                        indexof = index
                        return true
                    }
                    return false
                })
                if (!comment)
                    return res.status(400).send([{ msg: 'comment not found' }])
                console.log(comment.user, req.user._id);

                if (`${comment.user}` !== `${req.user._id}`)
                    return res.status(400).send([{ msg: 'user not Authorized' }])
                post.comments.splice(indexof, 1)
                console.log(post.comments);

                await post.save()
                res.send(post)
            } else {
                res.status(500).send([{ msg: 'server error' }])
            }
        } catch (error) {

            if (error.kind === 'ObjectId')
                return res.status(500).send([{ msg: 'post not found ' }])
            res.status(500).send([{ msg: error.message }])
        }
    }

}

export default new postController()