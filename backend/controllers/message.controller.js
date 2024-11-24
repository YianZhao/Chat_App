import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js'
import { getReceiverSocketId, io } from "../socket/socket.js";
import {redisClient} from '../db/connectToRedis.js';

export const sendMessage = async(req, res) => {
    try {
      const { message } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;
  
      let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
      });
  
      // 如果是第一次对话，创建新的会话
      if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
        });
      }
  
      const newMessage = new Message({
        senderId,
        receiverId,
        message,
      });
  
      if (newMessage) {
        conversation.messages.push(newMessage._id);
      }
  
      // 保存消息和会话
      await Promise.all([newMessage.save(), conversation.save()]);
  
      // 更新缓存中的会话消息
      const cacheKey = `conversation:${senderId}:${receiverId}`;
      const updatedMessages = await Conversation.findById(conversation._id).populate('messages');
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(updatedMessages.messages)); // 更新缓存，1小时过期
  
      // Socket.IO 通知接收者有新消息
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
  
      res.status(201).json(newMessage);
  
    } catch (error) {
      console.log('Error in sendMessage controller:', error.message);
      res.status(500).json({ error: "Internal error" });
    }
  };



export const getMessage = async(req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const cacheKey = `conversation:${senderId}:${userToChatId}`;

    // process.stdout.write("Testing output\n");
    // console.log("Starting getMessage function"); 
    // console.time("getMessage duration");

    // 尝试从 Redis 获取缓存的会话消息
    const cachedMessages = await redisClient.get(cacheKey);

    if (cachedMessages) {
      // console.log("Cache hit");
      // console.timeEnd("getMessage duration");
      return res.status(200).json({ messages: JSON.parse(cachedMessages) });
    }

    // console.log("Cache miss");

    // 如果没有缓存，查询数据库
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] }
    }).populate('messages'); // 查询完整的消息

    if (!conversation) {
        // console.timeEnd("getMessage duration");
      return res.status(200).json([]);
    }

    // 将消息记录存入 Redis，设置过期时间
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(conversation.messages)); // 1小时过期
    // console.timeEnd("getMessage duration");

    res.status(200).json({ messages: conversation.messages });

  } catch (error) {
    // console.log('Error in getMessage controller:', error.message);
    res.status(500).json({ error: "Internal error" });
  }
};
