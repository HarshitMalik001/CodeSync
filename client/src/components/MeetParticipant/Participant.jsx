import React, { useEffect, useState } from 'react'

function Participant(props) {
  // State for Participants
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Sulammita', status: 'online' },
    { id: 2, name: 'Dennis Ivy', status: 'offline' },
    { id: 3, name: 'Shahriar P. Shuvo', status: 'online' },
    { id: 4, name: 'John Doe', status: 'online' },
    { id: 5, name: 'Jane Smith', status: 'offline' },
    { id: 1, name: 'Sulammita', status: 'online' },
    { id: 2, name: 'Dennis Ivy', status: 'offline' },
    { id: 3, name: 'Shahriar P. Shuvo', status: 'online' },
    { id: 4, name: 'John Doe', status: 'online' },
    { id: 5, name: 'Jane Smith', status: 'offline' },
    { id: 1, name: 'Sulammita', status: 'online' },
    { id: 2, name: 'Dennis Ivy', status: 'offline' },
    { id: 3, name: 'Shahriar P. Shuvo', status: 'online' },
    { id: 4, name: 'John Doe', status: 'online' },
    { id: 5, name: 'Jane Smith', status: 'offline' },
  
  ]);


  useEffect(()=>{
    //when new user joins updates it
    
  },[participants]);

  console.log(participants);

  return (
    <div className='h-[80vh] bg-gray-800 overflow-y-auto border border-gray-600 rounded-xl'>
      <div className=" w-full p-4">
        <div className="space-y-3">
          {participants.map((participant) => (
            <div key={participant.id} className="flex items-center space-x-3 border border-s-orange-300 p-4 rounded-xl hover:bg-black transition-all duration-300 ease-in-out cursor-pointer">
              <span
                className={`h-3 w-3 rounded-full ${participant.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                  }`}
              ></span>
              <span className="text-white">{participant.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Participant