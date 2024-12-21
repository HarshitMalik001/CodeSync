import React, { useState } from 'react';
import IconMic from '../../icons/microphone/IconMic';
import IconMicOff from '../../icons/microphone/IconMicOff';
import IconVideo from '../../icons/video/IconVideo';
import IconVideoOff from '../../icons/video/IconVideoOff';
import IconScreen from '../../icons/IconScreenShare';

function MeetVideoControls({ mystream, setMystream }) {
  const [isMicOn, setMicOn] = useState(true);
  const [isVideoOn, setVideoOn] = useState(true);
  const [isScreenSharing, setScreenSharing] = useState(false);

  const toggleMic = () => {
    if (mystream) {
      const audioTrack = mystream.getTracks().find((track) => track.kind === "audio");
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setMicOn(audioTrack.enabled);
  
        const updatedStream = new MediaStream([
          ...mystream.getAudioTracks(),
          ...mystream.getVideoTracks(),
        ]);
        setMystream(updatedStream);
      }
    }
  };

 
  const toggleVideo = () => {
    if (mystream) {
      const videoTrack = mystream.getTracks().find((track) => track.kind === "video");
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setVideoOn(videoTrack.enabled);
  
        const updatedStream = new MediaStream([
          ...mystream.getAudioTracks(),
          ...mystream.getVideoTracks(),
        ]);
        setMystream(updatedStream);
      }
    }
  };
  

  const toggleScreenSharing = () => {
    setScreenSharing(!isScreenSharing);
  };

  return (
    <div className="flex space-x-4 justify-center items-center p-1">
      {/* Mic button */}
      <button
        onClick={toggleMic}
        className={`px-4 py-2 rounded-full text-white font-semibold focus:outline-none ${isMicOn ? 'bg-blue-500' : 'bg-gray-500'}`}
      >
        {isMicOn ? <IconMic /> : <IconMicOff />}
      </button>

      {/* Video button */}
      <button
        onClick={toggleVideo}
        className={`px-4 py-2 rounded-full text-white font-semibold focus:outline-none ${isVideoOn ? 'bg-blue-500' : 'bg-gray-500'}`}
      >
        {isVideoOn ? <IconVideo /> : <IconVideoOff />}
      </button>

      {/* Screen Sharing button */}
      <button
        onClick={toggleScreenSharing}
        className={`px-4 py-2 rounded-full text-white font-semibold focus:outline-none ${isScreenSharing ? 'bg-blue-500' : 'bg-gray-500'}`}
      >
        <IconScreen />
      </button>
    </div>
  );
}

export default MeetVideoControls;
