import express from 'express'
import cors from 'cors'
import './config/db'
import config from 'config'
import userRouter from './src/routes/user'
const PORT = config.get('PORT')
const app = express()

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.get('/', (req, res) => {
    res.send('App Running')
})
app.get('/*', (req, res) => res.send('<h1>Page not found</h1>'))
app.listen(PORT, () => {
    console.log('servie running');
})