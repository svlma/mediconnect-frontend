import React, { useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { AuthContext } from "../context/AuthContext";

const VideoCall = () => {
  const { roomId } = useParams();
  const meetingRef = useRef(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const myMeeting = async () => {
      const appID = 234358937;
      const serverSecret = "d6ad2e6cd90f3b1472d7af55915fb5a1";
      const userID = user._id;
      const userName = user.name || user.email;

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        userID,
        userName
      );

      console.log("Kit Token:", kitToken);

      const zc = ZegoUIKitPrebuilt.create(kitToken);

      if (zc) {
        zc.joinRoom({
          container: meetingRef.current,
          sharedLinks: [
            {
              name: "Copy Link",
              url: `localhost:5173/video-call/${roomId}`,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
          showScreenSharingButton: false,
        });

        // Save the instance to cleanup on unmount
        meetingRef.current.zcInstance = zc;
      } else {
        console.error("Failed to create ZegoUIKitPrebuilt instance");
      }
    };

    if (meetingRef.current) {
      myMeeting();
    }

    return () => {
      if (meetingRef.current && meetingRef.current.zcInstance) {
        // Attempt to leave the room or destroy the instance
        try {
          meetingRef.current.zcInstance.destroy();
        } catch (e) {
          console.error("Failed to destroy ZegoUIKitPrebuilt instance:", e);
        }
        meetingRef.current.zcInstance = null;
      }
    };
  }, [roomId, user]);

  return (
    <div>
      <div
        key={roomId}
        ref={meetingRef}
        style={{ width: "100%", height: "100vh" }}
      />
    </div>
  );
};

export default VideoCall;
