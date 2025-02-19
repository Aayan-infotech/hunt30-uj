import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import "./chatbox.css";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { text: "Hello 👋", sender: "bot" },
    { text: "Hey!", sender: "user" },
    { text: "How are you?", sender: "user" },
    { text: "Great! It's been a while... 😊", sender: "bot" },
    { text: "Indeed.... We're gonna have to fix that. 🤝🍻", sender: "user" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
  };

  return (
    <div className="chatbox">
      <div className="chatbox-header">
        <h3>Booking id: BOOK-jdkjgdkfg</h3>
        <span>X</span>
      </div>

      <div className="chatbox-body">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            <span className="message-text">{msg.text}</span>
          </div>
        ))}
      </div>

      <div className="chatbox-footer">
        <input
          type="text"
          placeholder="Text message...."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}><IoSend /></button>
      </div>
    </div>
  );
}
