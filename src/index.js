import express from 'express';
import clientRoutes from './routes/clientRoute.js'
import path from 'path';
import { fileURLToPath } from 'url';
import env from "dotenv";
import cors from 'cors';
env.config(); 

const app = express();
const port = process.env.PORT || 3001;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors({
    origin: 'https://thiiqqa.com', // ili '*' za sve domene
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // ako koristiš cookies ili auth
}));
app.use(express.json())  

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', clientRoutes)

app.listen(port, () => {
    console.log("listening on port 3001")
})