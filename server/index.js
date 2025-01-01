import mongoose from "mongoose";
import connectDB from "./src/db/index.js";
import dotenv from "dotenv";
import app from "./src/app.js";
import http from "http";
import { Server } from "socket.io";
import ACTIONS from "./src/Action.js";
import { log } from "console";

dotenv.config();

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

            // handle colabrative compiler
            socket.on(ACTIONS.CODE_CHANGE, ({ roomId, newCode }) => {
                socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code: newCode });
            });
            
            // syn_code for new user

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


        server.listen(5000, () => {
            console.log(`Server is listening on http://localhost:${5000}`);
        });
    })
    .catch(() => {
        console.log("Error in connecting mongoDB")
    })