import { Typegoose, prop, pre, instanceMethod } from 'typegoose'
import { Binary } from 'mongodb'
import config from 'config'
import bcrypt from 'bcryptjs'
@pre<User>('save', async function (next) {
    const user = this
    if (user.isModified('password') && user.password) {
        user.password = await bcrypt.hash(user.password.toString(), 6)

    }
    next()
})
export class User extends Typegoose {
    @prop({ required: true })
    name?: string

    @prop({ required: true, unique: true })
    email?: string

    @prop({ required: true, minlength: 8 })
    password?: string

    @prop()
    avatar?: Binary

    @instanceMethod toJSON() {
        const user: any = this
        const userData = user.toObject()
        delete userData.password
        delete userData.avatar
        userData.avatarUrl = `${config.get('Url')}/userAvatar/${user._id}`
        return userData
    }
}



export const userModel = new User().getModelForClass(User)