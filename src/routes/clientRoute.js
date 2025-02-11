// src/routes/clientRoute.js
import express from "express";
import * as clientController from "../controllers/clientController.js";
import * as authController from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js"; 

const router = express.Router();

router.get("/clients", clientController.getClients);
router.post("/clients", upload.single("image"), verifyToken, clientController.createClients);
router.put("/clients/:id", verifyToken, clientController.updateClients);
router.delete("/clients/:id", verifyToken, clientController.deleteClient);
router.get("/clients/search", clientController.searchClients);

router.post("/auth/login", authController.loginUser);

export default router;
