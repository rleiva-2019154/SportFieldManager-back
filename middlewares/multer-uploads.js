import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from 'cloudinary'
import { extname } from 'path'
import { config } from "dotenv";

config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const profileImageStorage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: 'profiles',
        public_id: (req, file)=>{
            const fileExtension = extname(file.originalname)
            const fileName = file.originalname.split(fileExtension)[0]
            return `${fileName}-${Date.now()}`
        }
    }
})

export const uploadProfileImage = multer({
    storage: profileImageStorage,
    fileFilter: (req, file, cb)=>{
        cb(null,true)
    },
    limits:{
        fileSize: 10000000 //10 mb
    }
})

//Canchas
const fieldImageStorage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: 'fields',
        public_id: (req, file)=>{
            const fileExtension = extname(file.originalname)
            const fileName = file.originalname.split(fileExtension)[0]
            return `${fileName}-${Date.now()}`
        }
    }
})

export const uploadFieldImage = multer({
    storage: fieldImageStorage,
    fileFilter: (req, file, cb)=>{
        cb(null,true)
    },
    limits:{
        fileSize: 10000000
    }
})

const reservationImageStorage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: 'reservations',
        public_id: (req, file)=>{
            const fileExtension = extname(file.originalname)
            const fileName = file.originalname.split(fileExtension)[0]
            return `${fileName}-${Date.now()}`
        }
    }
})

export const uploadReservationImage = multer({
    storage: reservationImageStorage,
    fileFilter: (req, file, cb)=>{
        cb(null,true)
    },
    limits:{
        fileSize: 10000000 
    }
})

