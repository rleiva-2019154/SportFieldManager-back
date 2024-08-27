import Reservation from "./reservation.model.js";
import Field from "../fields/field.model.js";

export const reserveField = async(req, res)=> {
    const {fieldId, uid, startTime, endTime} = req.body
    let payment = req?.file?.filename ?? null
    try {
        const reservation = new  Reservation(
            {
                fieldId,
                uid,
                startTime,
                endTime,
                payment
            }
        )
        await reservation.save()
        res.json(
            {
                msg: 'Reserva creada exitosamente',
                reservation
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send({msg: 'Error al procesar la reservacion, intente nuevamente mas tarde', err})
    }
}

export const userReservations = async(req, res)=>{
    const uid = req.uid
    try {
        const reservations = await Reservation.find({uid})
            .populate('fieldId')
            .select('-createdAt -updatedAt -uid')
        if(reservations.length < 1) return res.status(404).json(
            {
                msg: 'No se encontraron reservaciones para este usuario'
            }
        )
        return res.json({reservations})

    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error al obtener las reservaciones'})
    } 
}

export const updateReservation = async (req, res) => {
    const { id } = req.params; // Obtiene el ID de la reserva desde los parámetros de la URL
    const { fieldId, startTime, endTime } = req.body; // Obtiene los datos a actualizar desde el cuerpo de la solicitud

    // Si se sube un nuevo comprobante de pago, se actualiza el campo `payment`
    let payment = req?.file?.filename ?? null;

    try {
        // Construye un objeto con los campos a actualizar
        const updateData = {
            fieldId,
            startTime,
            endTime
        };

        // Si se proporciona un nuevo comprobante de pago, se agrega al objeto de actualización
        if (payment) {
            updateData.payment = payment;
        }

        // Encuentra la reserva por ID y la actualiza con los nuevos datos
        const updatedReservation = await Reservation.findByIdAndUpdate(id, updateData, { new: true });

        // Si no se encuentra la reserva, devuelve un error 404
        if (!updatedReservation) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }

        // Devuelve un mensaje indicando que la reserva fue actualizada
        return res.json({
            message: "Reserva actualizada correctamente",
            reservation: updatedReservation,
        });
    } catch (err) {
        console.error('Error al actualizar reserva', err);
        return res.status(500).send({
            message: 'No se pudo actualizar la reserva, intenta de nuevo más tarde',
            err,
        });
    }
};


export const deleteReservation = async (req, res) => {
    const { id } = req.params; // Obtiene el ID de la reserva desde los parámetros de la URL

    try {
        // Encuentra la reserva por ID y la elimina
        const deletedReservation = await Reservation.findByIdAndDelete(id);

        // Si no se encuentra la reserva, devuelve un error 404
        if (!deletedReservation) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }

        // Devuelve un mensaje indicando que la reserva fue eliminada
        return res.json({
            message: "Reserva eliminada correctamente",
            reservation: deletedReservation,
        });
    } catch (err) {
        console.error('Error al eliminar reserva', err);
        return res.status(500).send({
            message: 'No se pudo eliminar la reserva, intenta de nuevo más tarde',
            err,
        });
    }
};
