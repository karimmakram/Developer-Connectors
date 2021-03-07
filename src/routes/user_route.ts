import { Router, Request, Response } from 'express'
import { check } from 'express-validator'
import userController from '../controllers/Cn_user'
import auth from '../middleware/auth'
import upload from '../middleware/upload'
const userRouter = Router()

// add user
userRouter.post("/user",
  function (req: Request, res: Response) {
    upload(req, res, function (err: any) {
      if (err)
        return res.status(400).send([{ msg: err.message + ' max size 1MB' }])
      userController.Register(req, res)
    })
  })

//login
userRouter.post('/login', [check('email', 'include valid email').isEmail(),
check('password', 'password is required').exists()], userController.Login)

userRouter.get('/userauth', auth, (req, res) => {
  res.send(req.user)
})

//get user image
userRouter.get('/userAvatar/:id', userController.ImageUrl)
export default userRouter