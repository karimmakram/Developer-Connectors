import { Typegoose, prop, Ref, instanceMethod } from 'typegoose'
import { User } from './users'
import { Binary } from 'mongodb'
import { Comment } from './classes/comment'
import config from 'config'
import mongoose from 'mongoose'


class Like {
    @prop()
    _id?: mongoose.Types.ObjectId
    @prop({ ref: User, unique: true })
    user?: Ref<User>


}



class Post extends Typegoose {
    @prop({ ref: User, unique: true })
    user?: Ref<User>

    @prop({ required: true })
    text?: string

    @prop()
    name?: string

    @prop()
    avatar?: string

    @prop({ default: [], index: true })
    likes?: Like[]

    @prop({ default: [] })
    comments?: Comment[]

    @prop({ default: Date.now })
    date?: Date


}
export const postModel = new Post().getModelForClass(Post)
