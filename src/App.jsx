import React, { useContext, useState, useRef, useEffect } from "react";
import "./App.css";
import va from "./assets/ai.png";
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from "./context/UserContext";
import speakimg from './assets/speak.gif'; // This is your 'listening' GIF
import aigif from './assets/aiVoice.gif';

function App() {
  let { recognition, speaking, setSpeaking, prompt, response, setPrompt, setResponse, aiResponse, conversation, clearConversation } = useContext(datacontext);
  const [textInput, setTextInput] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Only scroll to bottom if a new message has been added to conversation
    // or if the processing state changes.
    // This prevents scrolling on every render if `prompt` changes for other reasons.
    scrollToBottom();
  }, [conversation, speaking]);


  const handleTextInputSubmit = () => {
    if (textInput.trim() !== "") {
      setSpeaking(true); // Indicate that the AI is processing
      setResponse(false); // Clear previous response state (e.g., aiVoice.gif)
      setPrompt("Processing..."); // Show a processing message immediately
      aiResponse(textInput, false); // Call aiResponse with the text input, prevent speaking
      setTextInput(""); // Clear the input field
    }
  };

  const handleVoiceCommandClick = () => {
    setSpeaking(true); // Indicate active listening/processing
    setResponse(false); // Clear any previous AI response text
    setPrompt("listening..."); // Show listening message immediately
    if (recognition) {
      recognition.start();
    } else {
      console.error("Recognition is undefined or not initialized.");
    }
  };

  return (
    <div className="main">
      <img src={va} alt="Mimico Virtual Assistant Logo" id="mimco" />
      <span>I'm Mimico Advanced Virtual Assistance</span>

      {/* Clear Chat Button - Placed inside .main for absolute positioning */}
      {conversation.length > 0 && ( // Only show if there's history
        <button onClick={clearConversation} className="clear-button top-right">
          Clear Chat
        </button>
      )}

      {/* Conversation History */}
      <div className="chat-history">
        {conversation.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.type}`}>
            {msg.type === 'ai' && <img src={aigif} alt="AI" id="aigif" className="message-icon" />}
            {msg.type === 'user' && <div className="user-initials message-icon">U</div>} {/* Simple user icon */}
            {msg.type === 'error' && <div className="error-icon message-icon">!</div>} {/* Error icon */}
            <p>{msg.text}</p>
          </div>
        ))}

        {/* Current processing/listening message display */}
        {speaking && !response && ( // Show only when speaking but no final response in history yet
          <div className="chat-message processing">
            <img src={speakimg} alt="Listening/Processing" id="speak" className="message-icon" />
            <p>{prompt}</p>
          </div>
        )}

        <div ref={messagesEndRef} /> {/* For auto-scrolling */}
      </div>

      {/* Always visible input and buttons section */}
      <div className="interaction-section">
        <div className="text-input-container">
          <input
            type="text"
            placeholder="Type your command..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="text-command-input"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleTextInputSubmit();
              }
            }}
          />
          <button onClick={handleTextInputSubmit} className="action-button">
            Send Text
          </button>
        </div>

        <button onClick={handleVoiceCommandClick} className="action-button">
          Click here <CiMicrophoneOn />
        </button>
      </div>
    </div>
  );
}

export default App;