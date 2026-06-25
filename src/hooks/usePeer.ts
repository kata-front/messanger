"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import { Socket } from "socket.io-client";

type PeerHook = {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  initateCall: () => void;
  destroy: () => void;
};

const usePeer = (socket: Socket | null, roomId: string): PeerHook => {
  const peerRef = useRef<SimplePeer.Instance | null>(null);

  const localStreamRef = useRef<MediaStream | null>(null);

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });
      return stream;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const destroy = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
    }

    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
      setRemoteStream(null);
    }
  }, []);

  const initateCall = useCallback(async () => {
    if (!socket) return;

    destroy();

    try {
      localStreamRef.current = await getMedia();
      setLocalStream(localStreamRef.current);
    } catch (error) {
      console.log(error);
      return;
    }

    const peer = new SimplePeer({
      initiator: true,
      stream: localStreamRef.current,
    });
    peerRef.current = peer;

    peer.on("signal", (data) => {
      console.log(data);
      socket.emit("signal", { to: roomId, data });
    });

    peer.on("stream", (stream) => {
      console.log(stream);
      setRemoteStream(stream);
    });

    peer.on("close", () => {
      destroy();
    });

    peer.on("error", (err) => {
      destroy();
      console.log(err);
    });
  }, [roomId, socket, destroy]);

  useEffect(() => {
    if (!socket) return;

    const handler = async ({ from, data }: { from: string; data: any }) => {
      if (peerRef.current) {
        peerRef.current.signal(data);
      } else {
        if (!localStream) {
          try {
            localStreamRef.current = await getMedia();
            setLocalStream(localStreamRef.current);
          } catch (error) {
            console.log(error);
            return;
          }
        }

        const peer = new SimplePeer({
          initiator: false,
          stream: localStreamRef.current!,
        });

        peerRef.current = peer;

        peer.on("signal", (data) => {
          console.log(data);
          socket.emit("signal", { to: from, data });
        });

        peer.on("stream", (incomingStream) => {
          console.log(incomingStream);
          setRemoteStream(incomingStream);
        });

        peer.on("close", destroy);
        peer.on("error", (err) => console.log(err));

        peer.signal(data);
      }
    };

    socket.on("signal", handler);
  }, [roomId, socket]);

  return {
    localStream,
    remoteStream,
    initateCall,
    destroy,
  };
};

export default usePeer;
