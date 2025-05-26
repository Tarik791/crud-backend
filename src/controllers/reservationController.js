import * as reservationServices from "../services/reservationServices.js";

export const getReservations = async (req, res) => {
    try {
        const clients = await reservationServices.getReservations();
        res.status(200).json(clients);
    } catch (err) {
        console.log('Error fetching clients 1:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const createReservation = async (req, res) => {
    try {
        const clientData = req.body;
        if (req.file) {
            clientData.document = req.file.filename;
        }
        console.log(clientData)
        const newClient = await reservationServices.createReservation(clientData);
        await reservationServices.sendReservationEmail(newClient);
        res.status(201).json(newClient);
    } catch (err) {
        console.error("Error creating client:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const updateReservation = async (req, res) => {
    try {
        const clientId = req.params.id;
        const clientData = req.body;

        const updated = await reservationServices.updateReservation(clientData, clientId);

        if (!updated) {
            return res.status(404).json({ message: 'Client not found or no changes made' });
        }

        res.status(200).json({ message: 'Client updated successfully' });
    } catch (err) {
        console.error('Error updating client:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};


export const deleteReservation = async (req, res) => {
    try {
        const clientId = req.params.id;
        const deleteClient = await reservationServices.deleteReservation(clientId);
        if(!deleteClient){
            return res.status(404).json({message: 'Client not found' });
        }
        res.status(200).send();
    } catch (err) {
        console.log('Error fetching clients 4:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const searchReservations = async (req, res) => {
    try{
        const searchTerm = req.query.q;
        const clients = await reservationServices.searchReservations(searchTerm);

        res.status(200).json(clients)
    } catch (err) {
        console.error('Error searching clients: ', err)
        res.status(500).json({message: 'Internal Server Error' })
    }
}