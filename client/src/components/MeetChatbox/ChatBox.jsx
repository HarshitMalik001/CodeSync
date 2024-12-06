import React, { useState } from 'react'
import IconSend from '../../icons/IconSend';

function ChatBox() {
  // State for Messages
  const [messages, setMessages] = useState([
    { id: 1, name: 'Sulammita', text: 'Hello everyone!', time: '10:00 AM' },
    { id: 2, name: 'Dennis Ivy', text: 'Good morning!', time: '10:05 AM' },
    { id: 3, name: 'Shahriar P. Shuvo', text: 'How is everyone doing?', time: '10:10 AM' },
  ]);

  // State for new message input
  const [newMessage, setNewMessage] = useState('');

  // Handler to add a new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      
      // Get the hours and minutes
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const formattedMinutes = minutes.toString().padStart(2, "0");

      const newMsg = {
        id: messages.length + 1,
        name: 'You',  // Replace with actual user name if needed
        text: newMessage,
        time: `${hours}:${formattedMinutes} ${period}`,
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };
  return (
    <div className='h-[80vh] bg-gray-800 '>
      {/* meeting massage */}
      <div className="space-y-4 h-[70vh] overflow-y-scroll border border-gray-600 rounded-xl p-2 ">
        {messages.map((message) => (
          <div key={message.id} className="flex items-center justify-between space-x-3 border-t border-gray-600">
            <div>
              <p className="text-white font-bold">{message.name}</p>
              <p className="text-gray-300 ps-3">{message.text}</p>
            </div>

            <div className="flex-shrink-0">
              <span className="text-sm text-gray-400">{message.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* New Message Input */}
      <div className="mt-4 flex items-center">
        <input
          type="text"
          className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg "
        >
          <IconSend></IconSend>
        </button>
      </div>
    </div>

  )
}

export default ChatBox;