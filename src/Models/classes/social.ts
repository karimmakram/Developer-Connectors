import { prop } from 'typegoose'
export class Social {
    @prop()
    youtube?: string
    @prop()
    twitter?: string
    @prop()
    facebook?: string
    @prop()
    linkedin?: string
    @prop()
    instagram?: string
}