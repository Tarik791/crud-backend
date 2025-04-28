import mysql from 'mysql2/promise';  
import env from 'dotenv';

env.config();

const db = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_DATABASE || "client_db",
});

export const query = async (sql, params) => {
    const [rows] = await db.execute(sql, params);  
    return rows;
};
