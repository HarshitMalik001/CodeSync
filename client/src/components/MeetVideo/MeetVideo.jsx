import React, { useEffect, useRef } from "react";
import VideoAud from "../userVidAd/VideoAud";

const MeetVideo = ({ setMystream, userName, participants }) => {

  const myvideo = useRef(null);

  useEffect(() => {
    // Access user media (video + audio)
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (myvideo.current) {
          myvideo.current.srcObject = stream;
          myvideo.current.autoplay = true;
          myvideo.current.muted = false;
        }
        setMystream(stream);
      })
      .catch((err) => {
        console.error("Error accessing media devices", err);
      });
  }, [setMystream]);

  return (
    <div className="h-[86vh] w-full p-1 bg-gray-950 overflow-scroll">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-2 ">
        <VideoAud ref={myvideo} userName={userName} />
        {participants.map((participant) => {
          return (
            <VideoAud
              key={participant.socketId}
              userName={participant.username}
              stream={participant.userStream}
            />
          )
        })}
      </div>
    </div>
  );
};

export default MeetVideo;
