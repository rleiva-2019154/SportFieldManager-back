import Field from "./field.model.js"

export const addField = async(req, res)=>{ 
    try {
        const data = req.body
        data.photo = req.file.filename ?? null //data.profilePicture ?? null

        const field = new Field(data)
        await field.save()
        return res.send(
            {
                message: `Cancha agregada a la base de datos correctamente`,
                fieldDetails:{
                    field: field.fieldName,
                    photo: field.photo
                } 
            }
        )
    } catch (err) {
        console.error('Error al registrar cancha', err)
        return res.status(500).send({message: 'No se pudo registrar la cancha, intenta de nuevo mas tarde', err})
    } 
}

export const listFields = async(req, res)=> {
    try {
        // Consulta todos los documentos en la colección de campos
        const fields = await Field.find();

        // Verifica si se encontraron canchas
        if (fields.length === 0) {
            return res.status(404).json({
                message: "No se encontraron canchas",
            });
        }

        // Devuelve la lista de canchas
        return res.json({
            message: "Canchas obtenidas correctamente",
            fields,
        });
    } catch (err) {
        console.error('Error al obtener canchas', err);
        return res.status(500).send({
            message: 'No se pudieron obtener las canchas, intenta de nuevo más tarde',
            err,
        });
    }
}