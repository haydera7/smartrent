import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Chatbot.css";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Hi! I'm SmartRent+ Assistant. I can help you find homes, compare prices, and even tell you how the weather affects your stay.",
    },
  ]);
  const [input, setInput] = useState("");
  const chatBodyRef = useRef(null);

  // auto-scroll to latest message
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:3000/api/chat", {
        message: input,
      });
      const botMsg = { from: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "⚠️ Sorry, something went wrong. Please try again later.",
        },
      ]);
    }
  };

  return (
    <div className="chatbot-container">
      <button
        className="chat-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        💬
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">SmartRent+ Assistant</div>

          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-msg ${msg.from === "user" ? "user" : "bot"}`}
              >
                <div className="chat-bubble">{msg.text}</div>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about homes, pricing, or weather..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
