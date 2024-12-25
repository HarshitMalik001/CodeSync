import React, { useState, useEffect, useRef } from 'react'
import Participant from '../components/MeetParticipant/Participant';
import ChatBox from '../components/MeetChatbox/ChatBox';
import MeetVideoControls from '../components/MeetVideo/MeetVideoControls';
import { initSocket } from '../socket';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import ACTIONS from '../Action'
import toast from 'react-hot-toast';
import Avatar from 'react-avatar';

function meetRoom() {

  const socketRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();

  const [videoEnabled, setVideoEnabled] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [mystream, setMystream] = useState(null);
  const [selectedButton, setSelectedButton] = useState('chat');
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    console.log('Message state : ', messages);
  }, [messages]);

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
        roomId,
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
        roomId, // Room ID
        message, // The message content
      });

      setNewMessage('');
    }
  };

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId === selectedButton ? null : buttonId);
  };


  return (
    <>
      <div className='relative h-screen w-screen bg-slate-700 flex flex-row gap-1 p-1'>
        <div className='basis-3/4 text-white p-1 '>
          <div className='p-1'>
            <div className="h-[86vh] w-full p-1 bg-gray-950 overflow-scroll">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-2 ">
                {participants.map((participant) => {
                  return (
                    <div className="relative w-full h-0 border" style={{ paddingTop: "56.25%" }}>
                      {/* If video is on, show the video element */}
                      <div className="absolute top-0 left-0 w-full h-full transform scale-x-[1] object-cover">
                        <Avatar name={participant.username} size="100%" />
                      </div>
                      <div className="absolute bottom-2 left-2 text-white">
                        <span className="font-semibold text-lg">{participant.username}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div>
            {<MeetVideoControls mystream={mystream} setMystream={setMystream} />}
          </div>

        </div>
        <div className='basis-1/4 bg-gray-800'>
          <div className="flex justify-center items-center p-2 m-1">
            <button
              onClick={() => handleButtonClick('chat')}
              className={`border border-black p-2 rounded-tl-lg rounded-bl-lg transition-all duration-300 ease-in-out ${selectedButton === 'chat' ? 'bg-blue-500 text-white' : 'bg-white text-black'
                }`}
            >
              Chat
            </button>

            {/* Participant Button */}
            <button
              onClick={() => handleButtonClick('participant')}
              className={`border border-black p-2 rounded-tr-lg rounded-br-lg transition-all duration-300 ease-in-out ${selectedButton === 'participant' ? 'bg-blue-500 text-white' : 'bg-white text-black'
                }`}
            >
              Participant
            </button>
          </div>

          {/* view for participants/chat */}
          <div className='p-1 m-1'>
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
      </div>
    </>
  )
}

export default meetRoom;
