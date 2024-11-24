import path from "path";
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import connectToMongoDB from './db/connectToMongoDB.js';
import messageRoutes from './routes/message.routes.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import { app, server } from './socket/socket.js';
import { redisClient, connectToRedis } from './db/connectToRedis.js';

dotenv.config();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// (async () => {
//   try {
//     await connectToRedis(); // 确保 Redis 连接已建立

//   } catch (error) {
//     console.error("Redis test error:", error);
//   }
// })();

server.listen(port, async () => {
  await connectToMongoDB();
  await connectToRedis();
  console.log(`Server is running on port ${port}`);
});
