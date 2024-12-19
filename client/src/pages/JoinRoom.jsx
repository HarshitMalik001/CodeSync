import { React, useState } from 'react';
import { v4 as uuidV } from 'uuid';

function JoinRoom() {

    const [roomId, setRoomId] = useState('');
    const [userName, setuserName] = useState('');

    const newRoom = (e) => {
        e.preventDefault();
        const id = uuidV();
        setRoomId(id);
    }

    const joinRoom = () => {
        // join room logic
        console.log("Joining room soon");
    }

    return (
        <div className='h-screen bg-slate-600 flex justify-center items-center ' >
            <div className='p-4 bg-slate-800 flex flex-col gap-4 rounded-2xl'>
                <h1 className='text-center text-white'>Join a Meeting!</h1>
                <div className='flex gap-4'>
                    <input
                        type="text"
                        placeholder='Room Id'
                        className='h-10 text-center'
                        onChange={(e) => {setRoomId(e.target.value)}}
                        value={roomId} />
                    <input
                        type="text"
                        placeholder='Username'
                        className='h-10 text-center'
                        onChange={(e) => {setuserName(e.target.value)}}
                        value={userName} />
                </div>
                <div className='flex flex-col gap-3'>
                    <button onClick={joinRoom} className='p-2 bg-green-500 w-full'>Join</button>
                    <button onClick={newRoom} className='p-2 bg-blue-500 w-full'>New</button>
                </div>
            </div>
        </div>
    )
}

export default JoinRoom