import jwt from 'jsonwebtoken'
import config from 'config'
import { Request, Response, NextFunction } from 'express'
import { userModel, User } from '../Models/users'
declare global {
    namespace Express {
        export interface Request {
            user: User
            token: string

        }
    }
}
const Auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')
    if (!token)
        return res.status(401).send('authorization denied')
    const _id = jwt.verify(token, config.get('jwtSecret'))
    console.log(_id);
    const user = await userModel.findOne({ _id }).select('-password')
    if (!user)
        return res.status(401).send(`user didn't exist`)
    try {

        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send(`tokne is not valid`)
    }

}
export default Auth