import React, { useEffect, useRef } from 'react';
import IconSend from '../../icons/IconSend';

function ChatBox({ messages, newMessage, setNewMessage, handleSendMessage }) {
  const messageEndRef = useRef(null);

  // Scroll to the bottom when new messages arrive
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-[80vh] bg-gray-800">
      {/* Messages List */}
      <div className="space-y-4 h-[70vh] overflow-y-scroll border border-gray-600 rounded-xl p-2">
        {messages.map((message, index) => (
          <div key={index} className="flex items-center justify-between space-x-3 border-t border-gray-600">
            <div>
              <p className="text-white font-bold">{message.username}</p>
              <p className="text-gray-300 ps-3">{message.text}</p>
            </div>

            <div className="flex-shrink-0">
              <span className="text-sm text-gray-400">{message.time}</span>
            </div>
          </div>
        ))}
        {/* Scroll to the latest message */}
        <div ref={messageEndRef} />
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
        <button onClick={handleSendMessage} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
          <IconSend />
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
