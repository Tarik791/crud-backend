import { query } from "../db.js";

export const getMessages = async () => {
    const rows = await query('SELECT * FROM messages');
    return rows;
};

const formatDateForMySQL = (isoDate) => {
  const date = new Date(isoDate);
  const pad = (n) => (n < 10 ? '0' + n : n);
  return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};


export const createMessage = async (messageData) => {
    const { user_id, message, created_at, reservation_id } = messageData;

    if (!user_id || !message || !created_at || !reservation_id) {
        throw new Error("All fields (user_id, message, created_at) are required");
    }

    const formattedDate = formatDateForMySQL(created_at);

    const result = await query(
        `INSERT INTO messages (user_id, message, created_at, reservation_id) VALUES (?, ?, ?, ?)`,
        [user_id, message, formattedDate, reservation_id]
    );

    console.log("Insert Message Result:", result);

    return {
        id: result.insertId,
        user_id,
        message,
        created_at,
        reservation_id
    };
};

export const updateMessage = async (messageData, messageId) => {
    if (!messageId) throw new Error("Message ID is required");

    const { message } = messageData;

    if (!message) {
        throw new Error("Message content is required for update");
    }

    const result = await query(
        `UPDATE messages SET message = ? WHERE id = ?`,
        [message, messageId]
    );

    console.log("Update Message Result:", result);

    return result.affectedRows > 0;
};

// Delete a message
export const deleteMessage = async (messageId) => {
    if (!messageId) throw new Error("Message ID is required");

    const result = await query(`DELETE FROM messages WHERE id = ?`, [messageId]);

    console.log("Delete Message Result:", result);

    return result.affectedRows > 0;
};

// Get all messages by a specific user
export const getMessagesByUser = async (userId) => {
    if (!userId) throw new Error("User ID is required");

    const rows = await query(`SELECT * FROM messages WHERE user_id = ?`, [userId]);

    return rows;
};

export const getMessagesByReservationId = async (reservationId) => {
    if (!reservationId) throw new Error("Reservation ID is required");

    const rows = await query(`SELECT * FROM messages WHERE reservation_id = ?`, [reservationId]);
    return rows;
};
