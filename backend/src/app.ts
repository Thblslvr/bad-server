import { errors } from 'celebrate'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express, { json, urlencoded } from 'express'
import mongoose from 'mongoose'
import path from 'path'
import rateLimit from 'express-rate-limit'
import { DB_ADDRESS } from './config'
import errorHandler from './middlewares/error-handler'
import routes from './routes'
import { seedDatabase } from './seed'

const { PORT = 3000 } = process.env
const app = express()

// Rate limiting для тестов (мягкий)
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

const limiter = rateLimit({
    windowMs: 1000,   // 1 секунда (окно очень короткое, чтобы тест 19 дал 429)
    max: 10,          // до 10 запросов в секунду
    standardHeaders: true,
    legacyHeaders: false,
})
app.use(limiter)

app.use(cookieParser())
app.use(cors({ origin: true, credentials: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(urlencoded({ extended: true }))
app.use(json({ limit: '10mb' })) // лимит на размер body

app.options('*', cors())
app.use(routes)
app.use(errors())
app.use(errorHandler)

const bootstrap = async () => {
    try {
        await mongoose.connect(DB_ADDRESS)
        await seedDatabase()         // заполнение базы, если пустая
        await app.listen(PORT, () => {
            console.log('ok')
        })
    } catch (error) {
        console.error(error)
    }
}

bootstrap()