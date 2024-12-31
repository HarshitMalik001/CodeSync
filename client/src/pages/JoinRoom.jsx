import { React, useState } from 'react';
import { v4 as uuidV } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function JoinRoom() {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState(JSON.parse(localStorage.getItem("userDetails"))?.fullname || 'user');
    const [error, setError] = useState('');

    const newRoom = (e) => {
        e.preventDefault();
        const id = uuidV();
        setRoomId(id);
        setError(''); // Clear error message if a new room is generated
    };

    const join = (e) => {
        e.preventDefault();

        if (!roomId || !userName) {
            toast.error("RoomId & Username required!");
            setError("Both Room ID and Username are required.");
            return;
        }

        console.log("Joining room with RoomId:", roomId, "and Username:", userName);
        navigate(`/meet-room/${roomId}`, {
            state: { userName , roomId },
        });
    };

    return (
        <div className="h-full bg-gray-900 flex justify-center items-center">
            <div className="p-6 bg-slate-800 flex flex-col gap-6 rounded-3xl shadow-xl w-full max-w-md relative transform transition duration-500 hover:scale-105 animate__animated animate__fadeIn">
                <h1 className="text-center text-white text-3xl font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 animate__animated animate__fadeIn">
                    Join a Meeting!
                </h1>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-500 text-white p-2 rounded-lg text-center">
                        {error}
                    </div>
                )}

                <div className="flex flex-col gap-6">
                    <input
                        type="text"
                        placeholder="Room Id"
                        className="h-12 px-4 rounded-xl bg-gray-700 text-white text-center focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 animate__animated animate__fadeIn"
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        className="h-12 px-4 rounded-xl bg-gray-700 text-white text-center focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 animate__animated animate__fadeIn "
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                    />
                </div>

                <div className="flex flex-col gap-6">
                    {/* Join Button */}
                    <button
                        onClick={join}
                        className="p-4 bg-green-500 rounded-xl text-white text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-green-600 animate__animated animate__fadeIn "
                    >
                        Join
                    </button>

                    {/* New Room Button */}
                    <button
                        onClick={newRoom}
                        className="p-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl text-white text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600 animate__animated animate__fadeIn"
                    >
                        New Room
                    </button>
                </div>
            </div>
        </div>
    );
}

export default JoinRoom;
