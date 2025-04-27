import { query } from "../db.js";

export const getUsers = async () => {
    const rows = await query('SELECT * FROM users');
    return rows;
};

export const createUsers = async (clientData) => {
    const { username, email, car, password, role, isactive, image } = clientData;
    const result = await query(
        `INSERT INTO users (username, email, car, password, role, isactive, image)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [username, email, car, password, role, isactive, image]
    );

    console.log("Insert Result:", result);

    return { id: result.insertId, username, email, car, password, role, isactive, image };
};

export const updateUsers = async (clientData, clientId) => {
    if (!clientId) throw new Error("Client ID is required");

    const { username, email, car, password, role, isactive, image } = clientData;

    if (!username || !email || !car || !password|| role === undefined || isactive === undefined) {
        throw new Error("All fields are required for updating a client");
    }

    const result = await query(
        `UPDATE users SET username = ?, email = ?, car = ?, password = ?, role = ?, isactive = ?, image = ? WHERE id = ?`,
        [username, email, car, password, role, isactive, image, clientId]
    );

    return result.affectedRows > 0;
};


export const deleteUser = async (clientId) => {
    if (!clientId) throw new Error("Client ID is required");

    const result = await query(`DELETE FROM users WHERE id = ?`, [clientId]);

    console.log("Delete Result:", result);

    return result.affectedRows > 0;
};

export const searchUsers = async (searchTerm) => {
    const {rows} = await query(
        `SELECT * FROM users WHERE username LIKE ? OR email LIKE ?`,
        [`%${searchTerm}%`, `%${searchTerm}%`]
    );
    

    return rows;
}