import React, { useState } from 'react'
import Participant from '../components/MeetParticipant/Participant';
import ChatBox from '../components/MeetChatbox/ChatBox';
import MeetVideo from '../components/MeetVideo/MeetVideo';
import MeetVideoControls from '../components/MeetVideo/MeetVideoControls';

function meetRoom() {
 // for user audio vide of user
  const [mystream, setMystream] = React.useState(null);

  // toggle for chatbox/Participants
  const [selectedButton, setSelectedButton] = useState('chat');

  const handleButtonClick = (buttonId) => {
    if (selectedButton === buttonId) {
      setSelectedButton(null);
    } else {
      setSelectedButton(buttonId);
    }
  };



  return (
    <>
      <div className='h-screen w-screen bg-slate-700 flex flex-row gap-1 p-1'>



        {/* main */}
        <div className='basis-3/4 text-white p-1 '>
          <div className='p-1'>
            <MeetVideo setMystream={setMystream} userName={'Shoib'} />
          </div>
          <div>
            {mystream && <MeetVideoControls mystream={mystream} />}
          </div>

        </div>

        {/* chat/participats */}
        <div className='basis-1/4 bg-gray-800'>
          {/* toggel for chat/participant */}
          <div className="flex justify-center items-center p-2 m-1">
            {/* Chat Button */}
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
            {selectedButton === 'participant' ? <Participant /> : <ChatBox />}
          </div>
        </div>
      </div>
    </>
  )
}

export default meetRoom
