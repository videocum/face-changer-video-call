import React from "react";
import { LiveKitRoom } from "@livekit/components-react";

export default function VideoCall() {
  const livekitURL = "wss://your-livekit-server-url";
  const token = "YOUR_LIVEKIT_TOKEN";

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={livekitURL}
      connect={true}
    >
      <h2>Face Changer Video Call Active</h2>
      {/* Face overlay coming next */}
    </LiveKitRoom>
  );
}
