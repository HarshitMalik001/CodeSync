import React, { useState , useEffect} from 'react';

const MeetRoom = () => {
  // State for Participants
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Sulammita', status: 'online' },
    { id: 2, name: 'Dennis Ivy', status: 'offline' },
    { id: 3, name: 'Shahriar P. Shuvo', status: 'online' },
    { id: 4, name: 'John Doe', status: 'online' },
    { id: 5, name: 'Jane Smith', status: 'offline' },
  ]);

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
      const newMsg = {
        id: messages.length + 1,
        name: 'You',  // Replace with actual user name if needed
        text: newMessage,
        time: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex justify-between items-center h-full">
      {/*Participants Section */}


      {/* Meet Section */}
      <div className="bg-gray-900  mb-4 p-4 h-80">
        <div className=" flex items-center justify-center">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"  // Replace with a valid stream URL
            title="Stream"
            className="w-full h-full rounded-lg"
          ></iframe>
        </div>
      </div>

      {/* Messages Section */}
      <div className="bg-gray-800  p-4 h-96 overflow-y-scroll">
        <div className="text-white mb-4">
          <h2 className="font-bold">Messages</h2>
        </div>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <span className="text-sm text-gray-400">{message.time}</span>
              </div>
              <div>
                <p className="text-white font-bold">{message.name}</p>
                <p className="text-gray-300">{message.text}</p>
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
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Send
          </button>
        </div>
      </div>

    </div>
  );
};

export default MeetRoom;
