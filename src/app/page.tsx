"use client";
import usePeer from "@/hooks/usePeer";
import useSocket from "@/hooks/useSocket";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const localRef = useRef<HTMLVideoElement | null>(null);
  const remoteRef = useRef<HTMLVideoElement | null>(null);

  const ROOM_ID = "room-1";

  const socket = useSocket(ROOM_ID);
  const {
    destroy,
    initateCall: startCall,
    remoteStream,
    localStream
  } = usePeer(socket, ROOM_ID);

  useEffect(() => {
    if (remoteStream) {
      remoteRef.current!.srcObject = remoteStream;
    }
  }, [remoteStream]);

  useEffect(() => {
    if (localStream) {
      localRef.current!.srcObject = localStream;
    }
  }, [localStream]);

  if (!socket) return <div>Connecting...</div>

  return (
    <>
      <div className="object-cover object-center">
        <video ref={localRef} autoPlay muted className="size-full"></video>
      </div>

      <div className="object-cover object-center">
        <video ref={remoteRef} autoPlay className="size-full"></video>
      </div>

      <button onClick={startCall}>Call</button>

      <button onClick={() => destroy()}>Destroy</button>
    </>
  );
}
