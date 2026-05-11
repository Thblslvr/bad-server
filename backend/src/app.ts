import { errors } from 'celebrate'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express, { json, urlencoded } from 'express'
import mongoose from 'mongoose'
import path from 'path'
import rateLimit from 'express-rate-limit'
// import helmet from 'helmet'  // временно отключён
import { DB_ADDRESS } from './config'
import errorHandler from './middlewares/error-handler'
import routes from './routes'
import { seedDatabase } from './seed'

const { PORT = 3000 } = process.env
const app = express()

// app.use(helmet())   // закомментировано до выяснения причин таймаутов

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,               // достаточно для тестов
  standardHeaders: true,
  legacyHeaders: false,
})
app.use(limiter)

app.use(cookieParser())
app.use(cors({
  origin: true,
  credentials: true,
}))

app.use(express.static(path.join(__dirname, 'public')))
app.use(urlencoded({ extended: true }))
app.use(json({ limit: '10mb' }))

app.options('*', cors())
app.use(routes)
app.use(errors())
app.use(errorHandler)

const bootstrap = async () => {
  try {
    await mongoose.connect(DB_ADDRESS)
    await seedDatabase()
    await app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log('ok')
    })
  } catch (error) {
    console.error(error)
  }
}

bootstrap()