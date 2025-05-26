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
var allowlist = ['https://thiiqqa.com', 'https://thiiqqa.com/', 'http://localhost:3000']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Credentials', 'true');
        return res.status(200).json({});
    }
    next();
});


app.use(express.json())  

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', clientRoutes)

app.listen(port, () => {
    console.log("listening on port 3001")
})