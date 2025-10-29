import { Router } from "express";
import axios from "axios";
import { signToken } from "../utils/jwt";

const router = Router();

/**
 * POST /api/signup
 */
router.post("/signup", async (req, res) => {
    try {
        const { username, password, firstName, lastName } = req.body;
        const response = await axios.post("https://dummyjson.com/users/add", {
            username,
            password,
            firstName,
            lastName,
        });
        return res.json({ success: true, user: response.data });
    } catch (err: any) {
        console.error(err);
        return res
            .status(500)
            .json({ success: false, message: "Signup failed", error: err.message });
    }
});

/**
 * POST /api/login
 */
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const response = await axios.post(
            "https://dummyjson.com/auth/login",
            { username, password },
            { headers: { "Content-Type": "application/json" } }
        );

        const user = response.data;

        // Our app’s token (contains dummyjson token too)
        const token = signToken({
            userId: user.id,
            username: user.username,
            djToken: user.token,
        });

        return res.json({
            success: true,
            token,
            user: { id: user.id, username: user.username },
        });
    } catch (err: any) {
        const msg =
            err.response?.data?.message || "Login failed. Invalid credentials?";
        return res.status(401).json({ success: false, message: msg });
    }
});

export default router;
