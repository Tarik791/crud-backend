// src/routes/clientRoute.js
import express from "express";
import * as clientController from "../controllers/clientController.js";
import * as userController from "../controllers/userController.js";
import * as reservationController from "../controllers/reservationController.js";
import * as carController from "../controllers/carController.js";
import * as authController from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js"; 

const router = express.Router();

router.get("/cars", carController.getCars);
router.post("/cars", upload.single("image"), verifyToken, carController.createCar);
router.put("/cars/:id", verifyToken, carController.updateCar);
router.delete("/cars/:id", verifyToken, carController.deleteCar);
router.get("/cars/search", carController.searchCars);

router.get("/reservations", reservationController.getReservations);
router.post("/reservations", upload.single("image"), reservationController.createReservation);
router.put("/reservations/:id", verifyToken, reservationController.updateReservation);
router.delete("/reservations/:id", verifyToken, reservationController.deleteReservation);
router.get("/reservations/search", reservationController.searchReservations);

router.get("/users", userController.getUsers);
router.post("/users", upload.single("image"), verifyToken, userController.createUsers);
router.put("/users/:id", verifyToken, userController.updateUsers);
router.delete("/users/:id", verifyToken, userController.deleteUser);
router.get("/users/search", userController.searchUsers);
// router.post('/testimonials', userController.createTestimonials);
router.post('/testimonials', userController.createTestimonialsUsersComments);
router.get("/testimonials", userController.getTestimonials);
//router.post('/testimonials/:testimonialId/comment', userController.createTestimonialsComment);

router.get("/clients", clientController.getClients);
router.post("/clients", upload.single("image"), verifyToken, clientController.createClients);
router.put("/clients/:id", verifyToken, clientController.updateClients);
router.delete("/clients/:id", verifyToken, clientController.deleteClient);
router.get("/clients/search", clientController.searchClients);

router.post("/auth/login", authController.loginUser);



export default router;
