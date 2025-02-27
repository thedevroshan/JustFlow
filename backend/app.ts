import express from "express";
import dotenv from "dotenv";

// Routes
import authRoutes from "./routes/authRoutes";

// DB
import { connectDB } from "./db/connect";

dotenv.config();

const app = express();

connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});


