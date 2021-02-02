import { Router } from 'express'
import { check } from 'express-validator'
import userController from '../controllers/Cn_user'
import auth from '../middleware/auth'
import upload from '../middleware/upload'
const userRouter = Router()

// add user
userRouter.post("/user", upload.single('avatar'),
    [check('email', 'include valid email').isEmail(),
    check('password', 'password is required and min length is 8 char').exists().isLength({ min: 8 }),
    check('name', 'name is required').exists().isLength({ min: 2 })],
    userController.Register)

//login
userRouter.post('/login', [check('email', 'include valid email').isEmail(),
check('password', 'password is required').exists()], userController.Login)

userRouter.post('/userauth', auth, (req, res) => {
    res.send(req.user)
})

//get user image
userRouter.get('/userAvatar/:id', userController.ImageUrl)
export default userRouter