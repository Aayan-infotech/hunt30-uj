import React, {useState, useEffect} from "react";
import {IoSend} from "react-icons/io5";
import "./chatbox.css";
import {database} from "../Config/firebase";

export default function ChatBox({
  open,
  onClose,
  orderId,
  senderId,
  receiverId,
  bookingId,
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!open || !orderId) {
      setMessages([]);
      return;
    }

    const messagesRef = database.ref("chats").child(orderId).child("messages");

    messagesRef.once("value", (snapshot) => {
      const existingMessages = [];
      snapshot.forEach((child) => {
        const message = child.val();
        message.type = message.senderId === senderId ? "self" : "other";
        existingMessages.push(message);
      });
      setMessages(existingMessages);
    });
  
    const handleNewMessage = (snapshot) => {
      const newMessage = snapshot.val();
      newMessage.type = newMessage.senderId === senderId ? "self" : "other";
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
  
    messagesRef.on("child_added", handleNewMessage);
  
    return () => {
      messagesRef.off("child_added", handleNewMessage);
    };
  }, [orderId, open, senderId]);

  const sendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = {
      msg: input,
      timeStamp: Date.now(),
      senderId: senderId,
      receiverId: receiverId,
    };
    database.ref("chats").child(orderId).child("messages").push(newMessage);
    setInput("");
  };

  return (
    open && (
      <div className="chatbox">
        <div className="chatbox-header">
          <h3>{`Booking id:- ${bookingId}`}</h3>
          <span className="close-button" onClick={onClose}>
            X
          </span>
        </div>

        <div className="chatbox-body">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.type}`}>
              <span className="message-text">{msg.msg}</span>
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
          <button onClick={sendMessage}>
            <IoSend />
          </button>
        </div>
      </div>
    )
  );
}
