import jwt from "jsonwebtoken";
import * as authService from "../services/authServices.js";
import dotenv from "dotenv";

dotenv.config(); 

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        const user = await authService.getUserByUsername(username);

        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        if (user.role != 1) {
            return res.status(401).json({ error: "User role must be admin" });
        }        

        const isMatch = password === user.password
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "local", 
            maxAge: 3600000, 
        });

        res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};