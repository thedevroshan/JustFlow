import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Routes
import authRoutes from "./routes/authRoutes";
import projectRoutes from "./routes/projectRoutes";

// DB
import { connectDB } from "./db/connect";

dotenv.config();

const app = express();

connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/project", projectRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});


