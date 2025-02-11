// src/middlewares/uploadMiddleware.js
import multer from "multer";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../uploads'); // Relativna putanja do uploads foldera

// Proveravamo da li folder postoji, ako ne, kreiramo ga
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage konfiguracija
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Čuva fajlove u uploads folderu
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Generiše jedinstveno ime fajla
    }
});

// Kreiramo multer upload middleware
const upload = multer({ storage: storage });

export default upload;
