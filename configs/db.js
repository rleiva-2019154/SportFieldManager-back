//Archivo de conexion a la DB
'use strict' //archivo del modo estricto de Js (valida algunas excepciones)

import mongoose from 'mongoose'

export const dbConnection = async ()=> {//Declarar la función
    try {

        // Ciclo de vida  de la conexion
        mongoose.connection.on('error', ()=>{
            console.log('MongoDB | could not be connect to database')
            mongoose.disconnect()
        })
        mongoose.connection.on('connecting', ()=>{
            console.log('MongoDB | try connecting')
        })
        mongoose.connection.on('connected', ()=>{
            console.log('MongoDB | Connected to MongoDB')
        })
        mongoose.connection.on('open', ()=>{
            console.log('MongoDB | connected to database')
        })
        mongoose.connection.on('disconected', ()=>{
            console.log('MongoDB | disconected to MongoDB')
        })
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50
        })
    } catch (err) {
        console.error('Database connection failed', err)
    }
}