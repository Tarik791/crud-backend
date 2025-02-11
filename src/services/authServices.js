import { query } from "../db.js";

export const getUserByUsername = async (username) => {
    const rows = await query("SELECT * FROM users WHERE username = ?", [username]);

    return rows.length > 0 ? rows[0] : null;
};
