import { errors } from 'celebrate'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express, { json, urlencoded } from 'express'
import mongoose from 'mongoose'
import path from 'path'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { DB_ADDRESS } from './config'
import errorHandler from './middlewares/error-handler'
import routes from './routes'

const { PORT = 3000 } = process.env
const app = express()

// Заголовки безопасности
app.use(helmet())

// Ограничение частоты запросов
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use(limiter)

app.use(cookieParser())
app.use(cors())

// Безопасная раздача статики
app.use(express.static(path.join(__dirname, 'public')))

app.use(urlencoded({ extended: true }))
app.use(json())

app.options('*', cors())
app.use(routes)
app.use(errors())
app.use(errorHandler)

const bootstrap = async () => {
  try {
    await mongoose.connect(DB_ADDRESS)
    await app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log('ok')
    })
  } catch (error) {
    console.error(error)
  }
}
bootstrap()