import React, { useEffect, useRef } from 'react';
import IconSend from '../../icons/IconSend';

function ChatBox({ messages, newMessage, setNewMessage, handleSendMessage }) {
  const messageEndRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Scroll to the bottom when new messages arrive
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className=" p-2 bg-gray-900 rounded-lg shadow-lg">
      {/* Messages List */}
      <div className="space-y-2 h-[75vh] overflow-y-auto roundd-xl p-2  animate__animated animate__fadeIn animate__faster">
        {messages.map((message, index) => (
          <div
            key={index}
            className="flex items-start justify-between space-x-4  bg-gradient-to-r from-slate-700 to-gray-800  p-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 animate__animated animate__fadeInUp"
          >
            {/* User Info */}
            <div className="flex-1">
              <p className="text-blue-200 font-bold text-lg">{message.username}</p>
              <p className="text-gray-300 pl-4 mt-1">{message.text}</p>
            </div>

            {/* Timestamp */}
            <div className="flex-shrink-0 text-right">
              <span className="text-sm text-gray-500 bg-gray-700 px-2 py-1 rounded-md">
                {message.time}
              </span>
            </div>
          </div>

        ))}
        {/* Scroll to the latest message */}
        <div ref={messageEndRef} />
      </div>

      {/* New Message Input */}
      <div className="mt-4 flex items-center space-x-3">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-lg bg-slate-700 text-gray-200 placeholder-gray-500 outline-none transition-all duration-300"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 focus:outline-none"
        >
          <IconSend className="animate__animated animate__zoomIn" />
        </button>
      </div>
    </div>
  );

}

export default ChatBox;
