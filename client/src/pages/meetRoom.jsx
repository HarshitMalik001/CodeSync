import React, { useState, useEffect, useRef } from 'react'
import Participant from '../components/MeetParticipant/Participant.jsx';
import ChatBox from '../components/MeetChatbox/ChatBox.jsx';
import MeetVideoControls from '../components/MeetVideo/MeetVideoControls.jsx';
import { initSocket } from '../socket';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import ACTIONS from '../Action.js'
import toast from 'react-hot-toast';
import Avatar from 'react-avatar';
import IconChat from '../icons/IconChat.jsx';
import IconUsers from '../icons/IconUsers.jsx';

function meetRoom() {

  const socketRef = useRef(null);
  const location = useLocation();
  // const { roomId } = useParams();
  const reactNavigator = useNavigate();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [mystream, setMystream] = useState(null);
  const [selectedButton, setSelectedButton] = useState('chat');
  const [participants, setParticipants] = useState([]);

  //socket
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      function handleErrors(e) {
        console.log('socket error', e);
        toast.error('Socket connection failed, Try again later.');
        reactNavigator('/');
      }

      // Emit JOIN to the server
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId: location.state?.roomId,
        username: location.state?.userName,
      });

      // Listen for 'JOINED' event and update participants
      socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
        if (username !== location.state.userName) {
          toast.success(`${username} joined room`);
        }
        setParticipants(clients);
      });

      // Listen for 'DISCONNECTED' event when a user leaves
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} Left the room!`);
        setParticipants((prev) => {
          return prev.filter(client => client.socketId !== socketId);
        });
      });

      // Listen for 'CHAT_MESSAGE' event 
      socketRef.current.on(ACTIONS.CHAT_MESSAGE, (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

    };

    init();

    return () => {
      socketRef.current?.disconnect();
      socketRef.current?.off(ACTIONS.JOINED);
      socketRef.current?.off(ACTIONS.DISCONNECTED);
      socketRef.current?.off(ACTIONS.CHAT_MESSAGE);
    };

  }, []);




  if (!location.state) {
    return <Navigate to='/' />
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        username: location.state?.userName,
        text: newMessage,
        time: new Date().toLocaleTimeString(),
      };

      socketRef.current.emit(ACTIONS.CHAT_MESSAGE, {
        roomId: location.state?.roomId, // Room ID
        message, // The message content
      });

      setNewMessage('');
    }
  };

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  };


  return (
    <>
      <div className='relative h-full w-screen  bg-gray-900 flex flex-row gap-1 p-1'>
        <div className='basis-3/4 text-white pl-1 '>
          <div className="h-[92%] w-full p-2 bg-slate-700 overflow-y-auto rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-2 ">
              {participants.map((participant, index) => {
                return (
                  <div
                    key={participant.socketId}
                    className={`relative w-full h-0 rounded-lg bg-gray-900 hover:scale-105 transform transition-transform duration-300 ease-in-out animate__animated animate__fadeIn animate__delay-${index}s shadow-md`}
                    style={{ paddingTop: "56.25%" }} // Maintain aspect ratio
                  >
                    {/* Avatar Centered */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Avatar
                        name={participant.username}
                        size="90"
                        round={true}
                        className="shadow-lg"
                      />
                    </div>

                    {/* Username */}
                    <div className="absolute bottom-1 left-1  px-2 py-1 rounded-lg">
                      <span className="font-medium text-blue-200">
                        {participant.username.trim()}
                      </span>
                    </div>
                  </div>

                );
              })}
            </div>
          </div>
          <div className="h-[8%] w-full flex justify-center items-center">
            <MeetVideoControls
              mystream={mystream}
              setMystream={setMystream}
              socketRef={socketRef}
              roomId={location.state?.roomId}
              reactNavigator={reactNavigator}
            />
          </div>

        </div>


        <div className='basis-1/4 bg-gray-900'>
          <div className="flex px-2 mb-2 ">
            {/* Chat Button */}
            <button
              onClick={() => handleButtonClick("chat")}
              className={`flex-1 flex justify-center items-center px-6 py-2 font-medium  transition-all duration-300 ease-in-out transform hover:scale-105 outline-none ${selectedButton === "chat"
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md"
                : "bg-gray-800 text-white "
                } rounded-l-lg`}
            >
              <IconChat />
            </button>

            {/* Middle Separator */}
            <div className="w-0.5 bg-gray-900"></div>

            {/* Participant Button */}
            <button
              onClick={() => handleButtonClick("participant")}
              className={`flex-1 flex justify-center items-center px-6 py-2 font-medium transition-all duration-300 ease-in-out transform hover:scale-105 outline-none ${selectedButton === "participant"
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md"
                : "bg-gray-800 text-white "
                } rounded-r-lg`}
            >
              <IconUsers />
            </button>
          </div>



          {/* view for participants/chat */}

          {selectedButton === 'chat' ? (
            <ChatBox
              messages={messages}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
            />
          ) : (
            <Participant participants={participants} />
          )}

        </div>
      </div>
    </>
  )
}

export default meetRoom;
