import { Router } from 'express'
import { check } from 'express-validator'
import userController from '../controllers/Cn_user'
import auth from '../middleware/auth'
import upload from '../middleware/upload'
const userRouter = Router()
userRouter.post("/user", upload.single('avatar'),
    userController.Register)

userRouter.post('/login', [check('email', 'include valid email').isEmail(),
check('password', 'password is required').exists()], userController.Login)

userRouter.post('/userauth', auth, (req, res) => {
    res.send(req.user)
})

userRouter.get('/userAvatar/:id', userController.ImageUrl)
export default userRouter