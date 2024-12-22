import React from 'react';
import Avatar from 'react-avatar';

function UserAv({username,status}) {
  return (
    <div className='text-white p-2 rounded-xl flex items-center justify-between bg-slate-700'>
      <div className='flex gap-2 items-center'>
        <Avatar name={username} size={50} round={true} />
        <span>{username} </span>
      </div>
      <span
        className={`h-3 w-3 rounded-full mr-3 ${status === 'online' ? 'bg-green-500' : 'bg-gray-500'
          }`}
      ></span>
    </div>
  )
}

export default UserAv