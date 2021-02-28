import { Typegoose, prop, Ref } from 'typegoose'
import { User } from './users'
import { Education } from './classes/education'
import { Experience } from './classes/experience'
import { Social } from './classes/social'







export class Profile extends Typegoose {
    @prop({ ref: User, unique: true })
    user?: Ref<User>

    @prop()
    company?: string

    @prop()
    website?: string

    @prop()
    location?: string

    @prop({ required: true })
    status?: string

    @prop({ required: true })
    skills?: [string]

    @prop()
    bio?: string

    @prop()
    githubUsername?: string

    @prop({ default: [] })
    experience?: Experience[]

    @prop({ default: [] })
    education?: Education[]

    @prop({ default: {} })
    social?: Social

    @prop({ default: Date.now() })
    date?: Date

}
const profile = new Profile().getModelForClass(Profile)
export default profile