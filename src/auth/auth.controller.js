import { generateJwt } from "../../utils/generate-jwt.js";
import User from "../users/user.model.js";
import bcryptjs from 'bcryptjs'

//funcion declarativa
export const register = async(req, res)=>{ 
    try {
        const data = req.body
        data.profilePicture = req.file.filename ?? null //data.profilePicture ?? null
        let salt =  await await bcryptjs.genSalt()
        data.password = await bcryptjs.hash(data.password, salt)
        const user = new User(data)
        await user.save()
        return res.send(
            {
                message: `Usuario agregado a la base de datos correctamente, inicia sesion con el correo ${user.email}`,
                userDetails:{
                    user: user.username,
                    email: user.email 
                } 
            }
        )
    } catch (err) {
        console.error('Error al registrar usuario', err)
        return res.status(500).send({message: 'No se pudo registrar al usuario, intenta de nuevo mas tarde', err})
    } 
}

export const login = async(req, res) =>{
    const { username, email, password } = req.body
    const lowerEmail = email ? email.toLowerCase() : null
    const lowerUsername = username ? username.toLowerCase() : null
    try {
        const userExist = await User.findOne(
            {
                $or:[
                    {username: lowerUsername},
                    {email: lowerEmail}
                ]
            }
        )
        if(!userExist){
            return res.status(404).json(
                {
                    msg: 'Credenciales invalidas',
                    error: 'Aun no tienes cuenta con nosotros'
                }
            )
        }
        const checkPasswors = await bcryptjs.compare(password, userExist.password)
        if(!checkPasswors) return res.status(403).json(
            {
                msg: 'Credenciales invalidas',
                error: 'Contrasena incorrecta'
            }
        )
    
        const token = await generateJwt({uid: userExist._id, email: userExist.email})
        //Momentanea
        return res.json(
            {
                msg: 'Inicio de sesion exitoso',
                userDetails: {
                    username: userExist.username,
                    token,
                    profilePicture: userExist.profilePicture,
                    uid: userExist._id
                }
            }
        )
    } catch (err) {
        console.error('Error al logearse', err)
        return res.status(500).send({message: 'Error al iniciar seseion, intenta de nuevo mas tarde', err})
    }
}
