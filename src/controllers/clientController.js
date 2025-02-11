import * as clientService from "../services/clientServices.js";

export const getClients = async (req, res) => {
    try {
        const clients = await clientService.getClients();
        res.status(200).json(clients);
    } catch (err) {
        console.log('Error fetching clients 1:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const createClients = async (req, res) => {
    try {
        const clientData = req.body;
        if (req.file) {
            clientData.image = req.file.filename;
        }
        const newClient = await clientService.createClients(clientData);
        res.status(201).json(newClient);
    } catch (err) {
        console.error("Error creating client:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const updateClients = async (req, res) => {
    try {
        const clientId = req.params.id;
        const clientData = req.body;

        const updated = await clientService.updateClients(clientData, clientId);

        if (!updated) {
            return res.status(404).json({ message: 'Client not found or no changes made' });
        }

        res.status(200).json({ message: 'Client updated successfully' });
    } catch (err) {
        console.error('Error updating client:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};


export const deleteClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        const deleteClient = await clientService.deleteClient(clientId);
        if(!deleteClient){
            return res.status(404).json({message: 'Client not found' });
        }
        res.status(200).send();
    } catch (err) {
        console.log('Error fetching clients 4:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const searchClients = async (req, res) => {
    try{
        const searchTerm = req.query.q;
        const clients = await clientService.searchClients(searchTerm);

        res.status(200).json(clients)
    } catch (err) {
        console.error('Error searching clients: ', err)
        res.status(500).json({message: 'Internal Server Error' })
    }
}