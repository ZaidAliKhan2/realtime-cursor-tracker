"use client";
import { useSearchParams } from "next/navigation";
import useMousePosition from "../useMousePosition";
import { io, Socket } from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { Position } from "@/types/Position";

const page = () => {
  const { x, y } = useMousePosition();
  const searchParams = useSearchParams();
  const username = searchParams.get("user");
  const [usersInfo, setUsersInfo] = useState<Record<string, Position>>({});
  const socketRef = useRef<Socket | null>(null);
  const currentHostname =
    typeof window !== "undefined" ? window.location.hostname : "localhost";

  // 2. Automatically point to port 4000 on that same host IP
  const SOCKET_URL = `http://${currentHostname}:4000`;

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      autoConnect: true,
    });
    socketRef.current = socket;

    socket.on("update-cursor", (activeUser: Position) => {
      setUsersInfo((prev) => ({
        ...prev,
        [activeUser.id]: activeUser,
      }));
    });

    socket.on("user-left", (id: string) => {
      setUsersInfo((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const emitRef = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    if (now - emitRef.current < 50) {
      return;
    }
    emitRef.current = now;
    if (socketRef.current) {
      socketRef.current.emit("move-cursor", username, x, y);
    }
  }, [x, y, username]);

  return (
    <div className="relative h-dvh w-dvw">
      <div>
        your mouse co-ordinates: {x} : {y}
      </div>
      <div
        className="absolute pointer-events-none z-50 flex flex-col items-start transition-[left,top] duration-50 ease-linear"
        style={{ left: x, top: y - 20 }}
      >
        <span className="mt-1 text-sm text-red-600 whitespace-nowrap select-none">
          {username}
        </span>
      </div>
      {Object.values(usersInfo).map((position) => (
        <div
          key={position.id}
          className="absolute pointer-events-none z-50 flex flex-col items-start transition-[left,top] duration-50 ease-linear"
          style={{ left: position.x, top: position.y }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            className="fill-red-600 drop-shadow-sm"
          >
            <path d="M2 2 L2 16 L6 12.5 L8.5 18 L11 17 L8.5 11.5 L14 11.5 Z" />
          </svg>
          <span className="mt-1 text-sm text-red-600 whitespace-nowrap select-none">
            {position.username}
          </span>
        </div>
      ))}
    </div>
  );
};

export default page;
