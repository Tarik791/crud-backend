import * as messageReadService from '../services/messageReadService.js';

export const getMessageRead = async (req, res) => {
    try {
        const { user_id, reservation_id } = req.query;
        console.log(req)
        if (!user_id || !reservation_id) {
            return res.status(400).json({ message: "Missing user_id or reservation_id" });
        }

        const readStatus = await messageReadService.getMessageRead(user_id, reservation_id);
        res.status(200).json(readStatus);
    } catch (err) {
        console.error("Error getting message read status:", err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateMessageRead = async (req, res) => {
    try {
        console.log(req.body)
        const { user_id, reservation_id, last_read_message_id } = req.body;

        if (!user_id || !reservation_id || !last_read_message_id) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        await messageReadService.updateMessageRead({ user_id, reservation_id, last_read_message_id });

        res.status(200).json({ message: "Read status updated successfully" });
    } catch (err) {
        console.error("Error updating message read status:", err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
