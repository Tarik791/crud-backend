// src/routes/clientRoute.js
import express from "express";
import * as clientController from "../controllers/clientController.js";
import * as userController from "../controllers/userController.js";
import * as reservationController from "../controllers/reservationController.js";
import * as carController from "../controllers/carController.js";
import * as messagesController from "../controllers/messagesController.js";
import * as messageReadController from "../controllers/messageReadController.js";

import * as authController from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js"; 

const router = express.Router();

// Message read tracking
router.get("/messages/read", messageReadController.getMessageRead);
router.post("/messages/read", messageReadController.updateMessageRead);


router.get("/cars", carController.getCars);
router.post("/cars", upload.single("image"), verifyToken, carController.createCar);
router.put("/cars/:id", verifyToken, carController.updateCar);
router.delete("/cars/:id", verifyToken, carController.deleteCar);
router.get("/cars/search", carController.searchCars);

router.post("/messages", verifyToken, messagesController.createMessage);
router.get("/messages/:id", messagesController.getMessagesByReservationId);
router.put("/messages/:id", verifyToken, messagesController.updateMessage);
router.delete("/messages/:id", verifyToken, messagesController.deleteMessage);
// clientRoute.js
router.get("/messages/:id/paginated", messagesController.getMessagesByReservationIdPaginated);


router.get("/reservations", reservationController.getReservations);
router.post("/reservations", upload.single("document"), reservationController.createReservation);
router.put("/reservations/:id", verifyToken, reservationController.updateReservation);
router.delete("/reservations/:id", verifyToken, reservationController.deleteReservation);
router.get("/reservations/search", reservationController.searchReservations);

router.get("/users", userController.getUsers);
router.post("/users", upload.single("image"), verifyToken, userController.createUsers);
router.put("/users/:id", upload.single("image"), verifyToken, userController.updateUsers);
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
