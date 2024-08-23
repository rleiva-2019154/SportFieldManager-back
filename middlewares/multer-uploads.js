import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from 'cloudinary'
import { extname } from 'path'

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const profileImageStorage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params:{
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