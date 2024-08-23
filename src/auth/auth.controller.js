import User from "../users/user.model.js";
import bcryptjs from 'bcryptjs'

//funcion declarativa
export const register = async(req, res)=>{ 
    try {
        const data = req.body
        data.profilePicture = req.file.filename ?? null
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
