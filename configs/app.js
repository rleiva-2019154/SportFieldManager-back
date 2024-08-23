//Servidor web
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import authRoutes from '../src/auth/auth.routes.js'
import { dbConnection } from './db.js'

//POO crear mas servidores
export class ExpressServer {
    constructor(){
        this.app = express()
        this.middlewares()
        this.connectDB()
        this.routes()
    }
    async connectDB(){//Ejecutar el codigo del db.js l conectarse a la DB
        await dbConnection()
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(helmet())
        this.app.use(morgan('dev'))
    }
    routes(){
        this.app.use('/user', authRoutes)
    }
    listen(){
        this.app.listen(process.env.PORT, ()=>{
            console.log(`Server HTTP is running in port ${process.env.PORT}` )
        })
    }
}

/*const server = new ExpressServer()
server.listen

const app = express()

export const initserver = ()={
    app.listen(3226)
    console.log('servidor http corriendo')
}

initserver()*/