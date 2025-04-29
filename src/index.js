import express from 'express';
import cors from 'cors';
import clientRoutes from './routes/clientRoute.js'
import path from 'path';
import { fileURLToPath } from 'url';
import env from "dotenv";

env.config(); 

const app = express();
const port = process.env.PORT || 3001;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sslOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/srv806430.hstgr.cloud/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/srv806430.hstgr.cloud/fullchain.pem')
  };

const corsOptions = {
    origin: ['https://thiiqqa.com', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.use(cors(corsOptions));
app.use(express.json())  

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', clientRoutes)

https.createServer(sslOptions, app).app.listen(port, () => {
    console.log("listening on port 3001")
})