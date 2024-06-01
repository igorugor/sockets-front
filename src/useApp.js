import { useEffect, useRef, useState } from "react";
import { socket } from "./socket";

export const useApp = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  let counter = useRef(0);

  const handleReceiveMessage = (msg, serverOffset) => {
    setMessages((prev) => [...prev, msg]);
    window.scrollTo(0, document.body.scrollHeight);
    socket.auth.serverOffset = serverOffset;
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (input) {
      // compute a unique offset
      const clientOffset = `${socket.id}-${counter.current++}`;
      console.log(clientOffset);
      socket.emit("chat message", input, clientOffset);
      setInput("");
    }
  };

  useEffect(() => {
    socket.on("chat message", handleReceiveMessage);

    return () => {
      socket.off("chat message", handleReceiveMessage);
    };
  }, []);

  return {
    input,
    messages,
    handleFormSubmit,
    handleInputChange,
  };
};
