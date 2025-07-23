import React, { useEffect, useRef } from 'react';
import {
  Room,
  RoomEvent,
  RemoteParticipant,
  createLocalTracks,
  connect,
} from 'livekit-client';

const VideoCall = () => {
  const room = useRef(null);
  const videoRef = useRef(null);
  const remoteRef = useRef(null);

  const LIVEKIT_URL = 'wss://facechangerapp-dbpjte7v.livekit.cloud';
  const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTMyODE3MTAsImlzcyI6IkFQSTdSZjg0MnpHQWtDNSIsIm5iZiI6MTc1MzI4MDgxMCwic3ViIjoidmlkZW8gY2FsbCIsInZpZGVvIjp7ImNhblB1Ymxpc2giOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsInJvb20iOiJ2aWRlb2NhbGwiLCJyb29tSm9pbiI6dHJ1ZX19._VWgp2XRL0UsTlZDbHHlQJ9M8LI5KaYhUGFYBidCHq4';

  useEffect(() => {
    const startVideoCall = async () => {
      try {
        const tracks = await createLocalTracks({ audio: true, video: true });

        const roomInstance = await connect(LIVEKIT_URL, TOKEN, {
          tracks,
        });

        room.current = roomInstance;

        // Attach your local camera video
        const localVideoTrack = tracks.find((t) => t.kind === 'video');
        if (localVideoTrack && videoRef.current) {
          localVideoTrack.attach(videoRef.current);
        }

        // Listen for remote participant
        roomInstance.on(RoomEvent.ParticipantConnected, (participant: RemoteParticipant) => {
          participant.on('trackSubscribed', (track) => {
            if (track.kind === 'video' && remoteRef.current) {
              track.attach(remoteRef.current);
            }
          });
        });
      } catch (err) {
        console.error('Connection Error:', err);
      }
    };

    startVideoCall();

    return () => {
      if (room.current) {
        room.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="video-wrapper" style={{ display: 'flex', gap: '20px' }}>
      <div>
        <h3>You</h3>
        <video ref={videoRef} autoPlay muted width={300} height={200} />
      </div>
      <div>
        <h3>Remote</h3>
        <video ref={remoteRef} autoPlay width={300} height={200} />
      </div>
    </div>
  );
};

export default VideoCall;

