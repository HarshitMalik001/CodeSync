import mongoose from "mongoose";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import app from "./app.js";
import http from "http";
import { Server } from "socket.io";
import ACTIONS from "./Action.js";

dotenv.config({
    path: './.env'
})

const server = http.createServer(app);
const io = new Server(server);

connectDB()
    .then(() => {
        console.log("Connected to mongoDB");
        const userSocketMap = {};
        function getAllConnectedClients(roomId) {
            return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
                return {
                    socketId,
                    username: userSocketMap[socketId],
                }
            });
        }


        app.get("/", (req, res) => {
            res.send("chal gya");
        })


        // Socket.IO connection event
        io.on('connection', (socket) => {
            console.log('A user connected:', socket.id);

            // Handle JOIN event (room and username)
            socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
                userSocketMap[socket.id] = username;
                socket.join(roomId);

                const clients = getAllConnectedClients(roomId);
                clients.forEach(({ socketId }) => {
                    io.to(socketId).emit(ACTIONS.JOINED, {
                        clients,
                        username,
                        socketId: socket.id,
                    });
                });
            });

            // Handle disconnecting event
            socket.on('disconnecting', () => {
                const rooms = [...socket.rooms];
                rooms.forEach((roomId) => {
                    socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                        socketId: socket.id,
                        username: userSocketMap[socket.id],
                    });
                });
                delete userSocketMap[socket.id];
                socket.leave(); // Officially leave the room
            });

            // Handle chat messages
            socket.on(ACTIONS.CHAT_MESSAGE, ({ roomId, message }) => {
                console.log(`Message from ${userSocketMap[socket.id]}: ${message.text}`);
                io.to(roomId).emit(ACTIONS.CHAT_MESSAGE, {
                    username: userSocketMap[socket.id], // Sender's username
                    text: message.text,
                    time: new Date().toLocaleTimeString(), // Message time
                });
            });
        });


        const port = process.env.PORT || 5000;
        server.listen(port, () => {
            console.log(`Server is listening on http://localhost:${port}`);
        });
    })
    .catch(() => {
        console.log("Error in connecting mongoDB")
    })