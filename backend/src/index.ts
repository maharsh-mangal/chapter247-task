import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";


dotenv.config();

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
    })
);

// Mount auth routes
app.use("/api", authRoutes);


const PORT = process.env.PORT || 4000;

app.get("/", (_req, res) => {
    res.json({ message: "Backend running OK 🚀" });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
