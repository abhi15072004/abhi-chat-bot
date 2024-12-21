import React, { useState, useEffect } from "react";
import { getMessages, sendMessage } from "../services/api";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await getMessages();
      setMessages(data);
    };

    fetchMessages();

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => socket.disconnect();
  }, []);

  const handleSend = async () => {
    const message = { sender: user.username, content };
    await sendMessage(message);
    socket.emit("sendMessage", message);
    setContent("");
  };

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <div style={{ border: "1px solid black", padding: "10px", height: "300px", overflowY: "scroll" }}>
        {messages.map((msg, index) => (
          <p key={index}>
            <b>{msg.sender}:</b> {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chat;
