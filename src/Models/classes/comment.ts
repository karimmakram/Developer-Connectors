import { prop, Ref } from 'typegoose'
import mongoose from 'mongoose'
import { User } from '../users'
export class Comment {
    @prop({ default: mongoose.Types.ObjectId() })
    _id?: mongoose.Types.ObjectId
    @prop({ ref: User, unique: true })
    user?: Ref<User>

    @prop({ required: true })
    text?: string

    @prop()
    name?: string

    @prop()
    avatar?: string

    @prop({ default: Date.now })
    date?: Date

}