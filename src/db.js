import mysql from 'mysql2/promise';  
import env from 'dotenv';

env.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_DATABASE || "client_db",
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000
});

export const query = async (sql, params) => {
    const [rows] = await pool.execute(sql, params);
    return rows;
};
