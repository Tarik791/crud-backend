import { query } from "../db.js";

export const getClients = async () => {
    const rows = await query('SELECT * FROM clients_tb');
    return rows;
};

export const createClients = async (clientData) => {
    const { name, email, job, rate, isactive, image } = clientData;
    const result = await query(
        `INSERT INTO clients_tb (name, email, job, rate, isactive, image)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [name, email, job, rate, isactive, image]
    );

    console.log("Insert Result:", result);

    return { id: result.insertId, name, email, job, rate, isactive, image };
};

export const updateClients = async (clientData, clientId) => {
    if (!clientId) throw new Error("Client ID is required");

    const { name, email, job, rate, isactive, image } = clientData;

    if (!name || !email || !job || rate === undefined || isactive === undefined) {
        throw new Error("All fields are required for updating a client");
    }

    const result = await query(
        `UPDATE clients_tb SET name = ?, email = ?, job = ?, rate = ?, isactive = ?, image = ? WHERE id = ?`,
        [name, email, job, rate, isactive, image, clientId]
    );

    return result.affectedRows > 0;
};


export const deleteClient = async (clientId) => {
    if (!clientId) throw new Error("Client ID is required");

    const result = await query(`DELETE FROM clients_tb WHERE id = ?`, [clientId]);

    console.log("Delete Result:", result);

    return result.affectedRows > 0;
};

export const searchClients = async (searchTerm) => {
    const {rows} = await query(
        `SELECT * FROM clients_tb WHERE name LIKE ? OR email LIKE ?`,
        [`%${searchTerm}%`, `%${searchTerm}%`]
    );
    

    return rows;
}