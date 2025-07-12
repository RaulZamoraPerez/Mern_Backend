import expres from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
import projectRoutes  from './routes/projectRoutes'
import authRoutes  from './routes/authRoutes'
import cors from 'cors'
import { corsConfig } from './config/cors'
import morgan from 'morgan'

dotenv.config()

connectDB()

const app = expres()
app.use(cors(corsConfig))

//Loggin 
app.use(morgan('dev'))

app.use(expres.json())  //habilita el body parser

//routes 
app.use('/api/auth', authRoutes )
app.use('/api/projects', projectRoutes )

export default app