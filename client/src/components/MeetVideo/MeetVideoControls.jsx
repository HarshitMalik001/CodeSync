import React , {useState} from 'react';
import IconMic from '../../icons/microphone/IconMic';
import IconMicOff from '../../icons/microphone/IconMicOff';
import IconVideo from '../../icons/video/IconVideo';
import IconVideoOff from '../../icons/video/IconVideoOff';
import IconScreen from '../../icons/IconScreenShare';

function MeetVideoControls() {
    const [isMicOn, setMicOn] = useState(false);
    const [isVideoOn, setVideoOn] = useState(false);
    const [isScreenSharing, setScreenSharing] = useState(false);

    const toggleMic = () => setMicOn(!isMicOn);
    const toggleVideo = () => setVideoOn(!isVideoOn);
    const toggleScreenSharing = () => setScreenSharing(!isScreenSharing);
    return (
        <div className="flex space-x-4">
            {/* Mic button */}
            <button
                onClick={toggleMic}
                className={`px-4 py-2 rounded-full text-white font-semibold focus:outline-none ${isMicOn ? 'bg-blue-500' : 'bg-gray-500'}`}
            >
                {isMicOn ? <IconMic/> : <IconMicOff/>}
            </button>

            {/* Video button */}
            <button
                onClick={toggleVideo}
                className={`px-4 py-2 rounded-full text-white font-semibold focus:outline-none ${isVideoOn ? 'bg-blue-500' : 'bg-gray-500'}`}
            >
                {isVideoOn ? <IconVideo/> : <IconVideoOff/>}
            </button>

            {/* Screen Sharing button */}
            <button
                onClick={toggleScreenSharing}
                className={`px-4 py-2 rounded-full text-white font-semibold focus:outline-none ${isScreenSharing ? 'bg-blue-500' : 'bg-gray-500'}`}
            >
                <IconScreen/>
            </button>
        </div>
    )
}

export default MeetVideoControls