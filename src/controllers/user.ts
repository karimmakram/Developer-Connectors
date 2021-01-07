import { Request, Response } from 'express'
import { userModel } from '../Models/users'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import config from 'config'
import gravatar from 'gravatar'
class userController {

    getToken = (id: String) => {
        return jwt.sign(id, config.get('jwtSecret'))

    }

    Register = async (req: Request, res: Response) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).send(error.array())
        }
        try {
            const { name, email, password }: { name: string, email: string, password: string } = req.body
            if (await userModel.findOne({ email })) {
                return res.status(400).send('you should choose other email Address')
            }
            const avatar = gravatar.url(email.toString(), {
                s: '200',
                r: 'pg',
                d: "mm"
            })
            const user = new userModel({ name, email, password, avatar })
            const token = this.getToken(user.id)
            await user.save()
            res.status(200).send({ user, token })
        } catch (e) {
            res.status(400).send(e.message)
        }
    }

    Login = async (req: Request, res: Response) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).send(error.array())
        }
        try {
            const { email, password }: { email: string, password: string } = req.body
            const user = await userModel.findOne({ email })
            if (!user) {
                return res.status(400).send('invaild login')
            }
            if (user.password) {
                if (!await bcryptjs.compare(password, user.password)) {
                    return res.status(401).send('invalid login')
                }
                const token = this.getToken(user.id)
                res.send({ user, token })
            }
        } catch (error) {

        }
    }


}
export default new userController()