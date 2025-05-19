import * as messageServices from '../services/messageServices.js';

export const getMessages = async (req, res) => {
    try {
        const messages = await messageServices.getMessages();
        res.status(200).json(messages);
    } catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const createMessage = async (req, res) => {
    try {
        const messageData = req.body;
        const newMessage = await messageServices.createMessage(messageData);
        res.status(201).json(newMessage);
    } catch (err) {
        console.error('Error creating message:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateMessage = async (req, res) => {
    try {
        const messageId = req.params.id;
        const messageData = req.body;

        const updated = await messageServices.updateMessage(messageData, messageId);

        if (!updated) {
            return res.status(404).json({ message: 'Message not found or no changes made' });
        }

        res.status(200).json({ message: 'Message updated successfully' });
    } catch (err) {
        console.error('Error updating message:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const messageId = req.params.id;
        const deleted = await messageServices.deleteMessage(messageId);

        if (!deleted) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.status(200).send();
    } catch (err) {
        console.error('Error deleting message:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getMessagesByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userMessages = await messageServices.getMessagesByUser(userId);
        res.status(200).json(userMessages);
    } catch (err) {
        console.error('Error fetching messages by user:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getMessagesByReservationId = async (req, res) => {
    try {
        
        const reservationId = req.params.id;
        
        const messages = await messageServices.getMessagesByReservationId(reservationId);
        res.status(200).json(messages);
    } catch (err) {
        console.error("Error fetching messages by reservation ID:", err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
