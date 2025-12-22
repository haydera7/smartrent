import { useEffect, useState, useRef } from "react";
import axios from "axios";

function BookingChat({ booking }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (booking?._id) fetchMessages();
  }, [booking?._id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    const res = await axios.get(
      `http://localhost:3000/messages/${booking._id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setMessages(res.data);
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    const res = await axios.post(
      `http://localhost:3000/messages/${booking._id}`,
      { text },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setMessages((prev) => [...prev, res.data]);
    setText("");
  };

  useEffect(() => {
  axios.patch(
    `http://localhost:3000/messages/${booking._id}/read`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
}, [booking._id]);


  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((m) => (
          <div key={m._id} className="message">
            <strong>{m.sender.fullName}:</strong> {m.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default BookingChat;
