import mongoose from 'mongoose'
import { prop } from 'typegoose'
export class Education {
    @prop({ default: mongoose.Types.ObjectId() })
    _id?: mongoose.Types.ObjectId
    @prop({ required: true })
    school?: string
    @prop({ required: true })
    degree?: string
    @prop({ required: true })
    filedofstudy?: string
    @prop({ required: true })
    from?: Date
    @prop()
    to?: Date
    @prop({ default: false })
    current?: boolean
    @prop()
    description?: string
}