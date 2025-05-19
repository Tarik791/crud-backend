import { query } from "../db.js";

export const getMessageRead = async (user_id, reservation_id) => {
    const rows = await query(
        "SELECT * FROM message_reads WHERE user_id = ? AND reservation_id = ?",
        [user_id, reservation_id]
    );
    return rows[0] || null;
};

export const updateMessageRead = async ({ user_id, reservation_id, last_read_message_id }) => {
    const result = await query(`
        INSERT INTO message_reads (user_id, reservation_id, last_read_message_id, last_read_at)
        VALUES (?, ?, ?, NOW())
        ON DUPLICATE KEY UPDATE last_read_message_id = VALUES(last_read_message_id), last_read_at = NOW()
    `, [user_id, reservation_id, last_read_message_id]);

    return result;
};
