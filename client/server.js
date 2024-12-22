import { Server } from 'socket.io';
import express from 'express';
import http from 'http';
import ACTIONS from './src/Action.js';

const app = express();
const server = http.createServer(app); // http  server instance
const io = new Server(server); // socket  server initialize


const userSocketMap = {};
function getAllConnectedClients(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
        return {
            socketId,
            username: userSocketMap[socketId],
        }
    });
}


io.on('connection', (socket) => {
    console.log('socket connected ', socket.id);

    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);

        const clients = getAllConnectedClients(roomId);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            })
        });

    });


    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave(); // method for official leave
    });

    socket.on(ACTIONS.CHAT_MESSAGE, ({ roomId, message }) => {
        console.log(`Message from ${userSocketMap[socket.id]}: ${message.text}`);
        
        io.to(roomId).emit(ACTIONS.CHAT_MESSAGE, {
            username: userSocketMap[socket.id],  // Sender's username
            text: message.text,
            time: new Date().toLocaleTimeString(), // Message time
        });
    });


    
});




const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}, http://localhost:${PORT}`);
});