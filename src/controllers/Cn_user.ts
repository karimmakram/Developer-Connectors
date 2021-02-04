import { Request, Response } from 'express'
import { userModel } from '../Models/users'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import bcryptjs from 'bcryptjs'
import config from 'config'
import sharp from 'sharp'
import { stringify } from 'qs'
class userController {

    getToken = (id: String) => {
        return jwt.sign(id, config.get('jwtSecret'))

    }

    Register = async (req: Request, res: Response) => {

        const error = validationResult(req)
        if (!error.isEmpty()) {
            console.log(error.array());
            return res.status(400).send(error.array())
        }
        try {
            const { name, email, password }: { name: string, email: string, password: string } = req.body
            if (await userModel.findOne({ email })) {
                return res.status(400).send([{ msg: 'you should choose other email Address' }])
            }
            if (!req.file) {
                return res.status(400).send([{ msg: 'you must upload Avatar' }])
            }
            const bufferImg = await sharp(req.file.buffer).png().resize(250, 250).toBuffer()
            const avatar = Buffer.from(bufferImg.toString('base64'))
            const user = new userModel({ name, email, password, avatar })
            await user.save()
            res.status(200).send({ user, token: this.getToken(user.id) })
        } catch (e) {
            res.status(400).send([{ msg: e.message }])
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
                return res.status(400).send([{ msg: 'invaild login' }])
            }
            if (user.password) {
                if (!await bcryptjs.compare(password, user.password)) {
                    return res.status(401).send([{ msg: 'invalid login' }])
                }
                const token = this.getToken(user.id)
                res.send({ user, token })
            }
        } catch (error) {

        }
    }

    ImageUrl = async (req: Request, res: Response) => {
        try {
            const _id = req.params.id
            if (!_id) {
                return res.status(400).send([{ msg: 'Not found' }])
            }
            const user = await userModel.findById({ _id })
            if (!user) {
                return res.status(400).send([{ msg: 'user dosent exist' }])
            }
            res.set('Content-Type', 'image/png')
            if (user.avatar) {
                res.send(Buffer.from(user.avatar.value(), 'base64'))
            }

        }
        catch (e) {
            res.status(500).send('serve erroe')
        }
    }

}
export default new userController()