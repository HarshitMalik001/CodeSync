import React from "react";
import Avatar from "react-avatar";

const VideoAud = React.forwardRef(({ userName }, ref) => {
  return (
    <div className="relative w-full h-0 border" style={{ paddingTop: "56.25%" }}>
      {/* <video
        ref={ref}
        className="absolute top-0 left-0 w-full h-full transform scale-x-[-1] object-cover"
      ></video> */}
      <div className="absolute top-0 left-0 w-full h-full transform scale-x-[1] object-cover">
        <Avatar
          name={userName}
          size="100%"
        />
      </div>
      <div className="absolute bottom-2 left-2 text-white">
        <span className="font-semibold text-lg">{userName}</span>
      </div>
    </div>
  );
});

export default VideoAud;
