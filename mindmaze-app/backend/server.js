// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/autoRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";

dotenv.config();
const app = express();
const allowedOrigins = [
  'https://curly-succotash-5574r5q5vpqc75x7-3000.app.github.dev'
]
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}))
app.use(express.json());

connectDB(); 

app.use('/api/auth', authRoutes);
app.use('/api/score', scoreRoutes);

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
