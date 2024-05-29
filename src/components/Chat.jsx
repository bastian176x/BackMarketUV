import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import appFirebase from "../credenciales";

const database = getDatabase(appFirebase);
const auth = getAuth(appFirebase);

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authUnsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    const messagesRef = ref(database, "messages");
    const messagesUnsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messagesList = data ? Object.values(data) : [];
      setMessages(messagesList);
    });

    return () => {
      authUnsubscribe();
      messagesUnsubscribe();
    };
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "" || !user) return;

    const messageRef = push(ref(database, "messages"));
    const message = {
      text: newMessage,
      timestamp: Date.now(),
      userId: user.uid,
      userName: user.displayName || user.email,
    };
    
    await set(messageRef, message);
    setNewMessage("");
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.userId === user?.uid ? "own-message" : ""}`}>
            <strong>{message.userName}:</strong> {message.text}
            <br />
            <span className="timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
