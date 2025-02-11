import { query } from "../db.js";
import bcrypt from "bcrypt";

export const getUserByUsername = async (username) => {
    const rows = await query("SELECT * FROM users WHERE username = ?", [username]);

    return rows.length > 0 ? rows[0] : null;
};

export const registerUser = async (userData) => {
    const { username, password, role } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await query(
        "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
        [username, hashedPassword, role]
    );

    return { id: result.insertId, username, role };
};
