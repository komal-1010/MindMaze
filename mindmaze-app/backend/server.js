// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import authRoutes from "./routes/autoRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import highScore from "./routes/highScore.js";
import aiRoutes from './routes/aiRoutes.js'
const app = express();
const allowedOrigins = [
  'https://mind-maze-phi.vercel.app',
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
                                app.use('/api/highscore', highScore);
                                app.use('/api/ai', aiRoutes)
                                app.listen(5000, () => {
                                  console.log('Server started on port 5000');
                                  });
                                  