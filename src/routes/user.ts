import { Router } from 'express'
import { check } from 'express-validator'
import userController from '../controllers/user'
import auth from '../middleware/auth'
const userRouter = Router()
userRouter.post("/user", [check('name', 'name requried').not().isEmpty(),
check('email', 'include valid email').isEmail(),
check('password', 'password ,min length 8 characters').isLength({ min: 8 })],
    userController.Register)

userRouter.post('/login', [check('email', 'include valid email').isEmail(),
check('password', 'password is required').exists()], userController.Login)

userRouter.post('/userauth', auth, (req, res) => {
    res.send(req.user)
})
export default userRouter