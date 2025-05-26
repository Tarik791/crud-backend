import mysql from 'mysql2/promise';  
import env from 'dotenv';

env.config();

const pool = mysql.createPool({
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_DATABASE,
     port: process.env.DB_PORT,
});

export const query = async (sql, params) => {
    const [rows] = await pool.execute(sql, params);
    return rows;
};
