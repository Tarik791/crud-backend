import express from 'express';
import clientRoutes from './routes/clientRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
import env from 'dotenv';
import cors from 'cors'; // ✅ Use import instead of require

env.config();

const app = express();
const port = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors({
  origin: 'https://thiiqqa.com',
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', clientRoutes);

// Start server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
