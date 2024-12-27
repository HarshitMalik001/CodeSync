import React, { useState } from 'react';
import IconMic from '../../icons/microphone/IconMic';
import IconMicOff from '../../icons/microphone/IconMicOff';
import IconVideo from '../../icons/video/IconVideo';
import IconVideoOff from '../../icons/video/IconVideoOff';
import IconScreen from '../../icons/IconScreenShare';
import CompilerPage from '../../pages/Compiler/index';
import IconEndMeet from '../../icons/IconEndMeet';

function MeetVideoControls({ mystream, setMystream, socketRef, roomId, reactNavigator }) {
  const [isMicOn, setMicOn] = useState(true);
  const [isVideoOn, setVideoOn] = useState(true);
  const [isCompiler, setCompiler] = useState(false);
  const [isCompilerVisible, setIsCompilerVisible] = useState(false);

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
    setCompiler(!isCompiler);
    setIsCompilerVisible(!isCompilerVisible);
  };

  const endCall = () => {
    reactNavigator('/meet-room');
  }

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
        className={`px-4 py-2 rounded-full text-white font-semibold focus:outline-none ${isCompiler ? 'bg-blue-500' : 'bg-gray-500'}`}
      >
        <IconScreen />
      </button>
      {isCompilerVisible && <CompilerPage socketRef={socketRef} roomId={roomId} />}

      <button
        className={'px-4 py-2 rounded-full text-white font-semibold focus:outline-none bg-red-600'}
        onClick={endCall}
      >
        <IconEndMeet />
      </button>

    </div>
  );
}

export default MeetVideoControls;
