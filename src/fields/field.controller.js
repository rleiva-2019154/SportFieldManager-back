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
        })
    }
}

export const editField = async (req, res) => {
    try {
        const { id } = req.params; // Obtiene el ID de la cancha desde los parámetros de la URL
        const data = req.body; // Obtiene los datos a actualizar desde el cuerpo de la solicitud

        // Si se sube una nueva foto, actualiza el campo `photo`, si no, usa la existente
        data.photo = req.file?.filename ?? data.photo;

        // Actualiza la cancha en la base de datos
        const updatedField = await Field.findByIdAndUpdate(id, data, { new: true });

        if (!updatedField) {
            return res.status(404).json({ message: "Cancha no encontrada" });
        }

        return res.json({
            message: "Cancha actualizada correctamente",
            fieldDetails: {
                field: updatedField.fieldName,
                type: updatedField.fieldType,
                capacity: updatedField.capacity,
                photo: updatedField.photo
            },
        });
    } catch (err) {
        console.error('Error al actualizar cancha', err);
        return res.status(500).send({
            message: 'No se pudo actualizar la cancha, intenta de nuevo más tarde',
            err,
        });
    }
}


export const deleteField = async (req, res) => {
    try {
        const { id } = req.params; // Obtiene el ID de la cancha desde los parámetros de la URL

        // Encuentra la cancha por ID y la elimina
        const deletedField = await Field.findByIdAndDelete(id);
        
        // Si la cancha no se encuentra, devuelve un error 404
        if (!deletedField) {
            return res.status(404).json({ message: "Cancha no encontrada" });
        }

        // Devuelve un mensaje indicando que la cancha fue eliminada
        return res.json({
            message: "Cancha eliminada correctamente",
            fieldDetails: deletedField,
        });
    } catch (err) {
        console.error('Error al eliminar cancha', err);
        return res.status(500).send({
            message: 'No se pudo eliminar la cancha, intenta de nuevo más tarde',
            err,
        })
    }
}
