import express from 'express'
import cors from 'cors'
import './config/db'
import config from 'config'
import userRouter from './src/routes/user_route'
import myParser from 'body-parser'
import { profileRoute } from './src/routes/profile_route'
import { postRoute } from './src/routes/post_route'

const PORT = config.get('PORT')
const app = express()

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(profileRoute)
app.use(postRoute)
app.use(myParser.json({ limit: '200mb' }));
app.use(myParser.urlencoded({ limit: '200mb', extended: true }));
app.use(myParser.text({ limit: '200mb' }))
app.get('/', (req, res) => {
    res.send('App Running')
})
app.get('/*', (req, res) => res.send('<h1>Page not found</h1>'))
app.listen(PORT, () => {
    console.log('servie running');
})