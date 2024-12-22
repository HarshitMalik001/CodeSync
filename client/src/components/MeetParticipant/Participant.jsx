import React from 'react';
import UserAv from '../userAvatar/UserAv';


function Participant({participants}) {  

  return (
    <div className='h-[80vh] bg-gray-800 overflow-y-auto border border-gray-600 rounded-xl'>
      <div className=" w-full p-4">
        <div className="space-y-3">
          {
            participants.map((user) => {
              return (
                <UserAv key={user.socketId}  username={user.username} status={true}  />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Participant;