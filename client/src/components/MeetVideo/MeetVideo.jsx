import React, { useEffect, useRef, useState } from "react";

const MeetVideo = ({ setMystream, userName }) => {
  const myvideo = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [micIcon, setMicIcon] = useState("mic-off");

  useEffect(() => {
    // Create an AudioContext and AnalyserNode for detecting audio activity
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    
    // Get the media stream (video + audio)
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (myvideo.current) {
          myvideo.current.srcObject = stream;
          myvideo.current.autoplay = true;
          myvideo.current.muted = false;
        }
        setMystream(stream); // Pass the stream to the parent component

        // Connect the audio stream to the analyser
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        // Set up a function to monitor the audio level
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const checkAudioActivity = () => {
          analyser.getByteFrequencyData(dataArray);
          
          let total = 0;
          for (let i = 0; i < bufferLength; i++) {
            total += dataArray[i];
          }

          // Calculate the average sound level
          const average = total / bufferLength;

          // If the average sound level is above a certain threshold, consider the user as speaking
          if (average > 10) {
            if (!isSpeaking) {
              setIsSpeaking(true);  // User is speaking
              setMicIcon("mic-on");
            }
          } else {
            if (isSpeaking) {
              setIsSpeaking(false);  // User is silent
              setMicIcon("mic-off");
            }
          }

          // Continue checking audio activity
          requestAnimationFrame(checkAudioActivity);
        };

        checkAudioActivity();  // Start checking audio activity
      })
      .catch((err) => {
        console.error("Error accessing media devices", err);
      });
  }, [setMystream, isSpeaking]);

  return (
    <div className="h-auto w-full p-2 bg-gray-950 relative">
      {/* Responsive video container */}
      <div className="relative w-full h-0" style={{ paddingTop: "56.25%" }}>
        <video
          ref={myvideo}
          className="absolute top-0 left-0 w-full h-full transform scale-x-[-1] object-cover"
        ></video>
      </div>

      {/* User's Name and Mic Icon */}
      <div className="absolute bottom-5 left-5 text-white flex items-center space-x-2">
        <span className="font-semibold text-lg">{userName}</span>
        <span>
          {micIcon === "mic-on" ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-green-500" viewBox="0 0 24 24">
              <path d="M12 1a3 3 0 0 1 3 3v9a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3zM4 10a8 8 0 0 0 16 0v4a4 4 0 0 1-8 0v-1a3 3 0 0 0-6 0v1a4 4 0 0 1-8 0V10z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-gray-500" viewBox="0 0 24 24">
              <path d="M12 1a3 3 0 0 1 3 3v9a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3zM4 10a8 8 0 0 0 16 0v4a4 4 0 0 1-8 0v-1a3 3 0 0 0-6 0v1a4 4 0 0 1-8 0V10z"/>
            </svg>
          )}
        </span>
      </div>
    </div>
  );
};

export default MeetVideo;
