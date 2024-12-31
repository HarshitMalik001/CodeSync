import React from 'react';
import Avatar from 'react-avatar';


function Participant({ participants }) {

  return (
    <div className="h-[80vh] overflow-y-auto rounded-xl m-2 mt-4 pb-2">
   
      {participants.map((user, index) => (
        <div
          key={user.socketId}
          className={`p-4 flex items-center justify-between bg-gradient-to-r from-slate-700 to-gray-800 rounded-lg shadow-md transform transition-transform duration-300 scale-110 animate__animated animate__fadeInUp animate__delay-${index}s mb-`}
        >
          {/* User Info */}
          <div className="flex gap-4 items-center">
            <Avatar name={user.username} size={50} round={true} />
            <span className="text-lg font-medium text-white">
              {user.username}
            </span>
          </div>
          {/* Status Indicator */}
          <div className="flex items-center">
            <span
              className={`h-3 w-3 rounded-full ${Math.random() > 0.5 ? 'bg-green-500' : 'bg-gray-500'}`}
              title={Math.random() > 0.5 ? 'Online' : 'Offline'}
            ></span>
          </div>
        </div>
      ))}
    
  </div>
  
  );
  
}

export default Participant;