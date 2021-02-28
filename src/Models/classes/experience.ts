import mongoose from 'mongoose'
import { prop } from 'typegoose'
export class Experience {
    @prop({ default: mongoose.Types.ObjectId() })
    _id?: mongoose.Types.ObjectId
    @prop({ required: true })
    title?: string
    @prop({ required: true })
    company?: string
    @prop({ required: true })
    location?: string
    @prop({ required: true })
    from?: Date
    @prop()
    to?: Date
    @prop({ default: false })
    current?: boolean
    @prop()
    description?: string
}