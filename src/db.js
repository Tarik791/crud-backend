import mysql from 'mysql2/promise';  
import env from 'dotenv';

env.config();

const pool = mysql.createPool({
     host: "147.93.88.25",
     user: "u504882771_thiiqqa",
     password: "W=bh8HTPCcM8" ,
     database: "u504882771_thiiqqa",
     port: 3306,
});

// const pool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "password",
//     database: "client_db",
//     port: 3306,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//     enableKeepAlive: true,
//     keepAliveInitialDelay: 10000
// });

export const query = async (sql, params) => {
    const [rows] = await pool.execute(sql, params);
    return rows;
};
