import React, { createContext, useState } from 'react';
import run from '../gemini';
export const datacontext = createContext();

function userContext({ children }) {
  let [speaking, setSpeaking] = useState(false);
  let [prompt, setPrompt] = useState("listening...");
  let [response, setResponse] = useState(false);
  let [conversation, setConversation] = useState([]);

  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "hi-GB";
    window.speechSynthesis.speak(text_speak);
  }

  async function aiResponse(inputPrompt, shouldSpeak = true) {
    // Add user's prompt to history immediately for AI-processed prompts
    setConversation(prev => [...prev, { type: 'user', text: inputPrompt }]);
    setSpeaking(true); // Ensure processing state is visible
    setResponse(false); // Reset response state while processing

    try {
      let text = await run(inputPrompt);

      let newText = text
        .split("**").join("")
        .split("*").join("")
        .replace(/\bgoogle\b/gi, "ADI")
        .replace(/\bGoogle\b/g, "adi")
        .replace(/गूगल/g, "आदitya");

      setPrompt(newText); // Update the prompt with the AI's response (for temporary display if needed)
      if (shouldSpeak) {
        speak(newText);
      }
      setResponse(true); // Indicate that a final response is ready

      // Add AI's response to history after it's generated
      setConversation(prev => [...prev, { type: 'ai', text: newText }]);

    } catch (error) {
      console.error("Error during AI response:", error);
      const errorMessage = "Error: Could not get a response.";
      setPrompt(errorMessage);
      setSpeaking(false);
      setResponse(true); // Mark response as ready, even if it's an error
      // Add error message to history
      setConversation(prev => [...prev, { type: 'error', text: errorMessage }]);
    }
  }

  // Helper for direct commands that don't go through Gemini API
  const handleDirectCommand = (command, responseText) => {
    // Add user command and AI response to history in one go
    setConversation(prev => [...prev, { type: 'user', text: command }, { type: 'ai', text: responseText }]);
    setPrompt(responseText); // Set prompt for current display
    speak(responseText); // Speak the response
    setResponse(true); // Mark response as ready
    setSpeaking(true); // Keep active state during speaking
    // A short timeout to allow the voice to play, then reset speaking.
    // This helps reset the display of the current processing GIF if needed,
    // but the history will persist.
    setTimeout(() => {
        setSpeaking(false);
    }, 2000); // Shorter timeout for direct command responses
  };


  let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new speechRecognition();

  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript;
    // We don't set prompt here directly as it's handled by aiResponse or handleDirectCommand
    takeCommand(transcript.toLowerCase());
  };

  function takeCommand(command) {
    if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.youtube.com/", "_blank");
      handleDirectCommand(command, "Opening YouTube.");
    } else if (command.includes("open") && command.includes("google")) {
      window.open("https://www.google.com/", "_blank");
      handleDirectCommand(command, "Opening Google.");
    } else if (command.includes("open") && command.includes("facebook")) {
      window.open("https://www.facebook.com/", "_blank");
      handleDirectCommand(command, "Opening Facebook.");
    } else if (command.includes("open") && command.includes("twitter")) {
      window.open("https://www.twitter.com/", "_blank");
      handleDirectCommand(command, "Opening Twitter.");
    } else if (command.includes("open") && command.includes("instagram")) {
      window.open("https://www.instagram.com/", "_blank");
      handleDirectCommand(command, "Opening Instagram.");
    } else if (command.includes("open") && command.includes("gmail")) {
      window.open("https://mail.google.com/", "_blank");
      handleDirectCommand(command, "Opening Gmail.");
    } else if (command.includes("open") && command.includes("whatsapp")) {
      window.open("https://web.whatsapp.com/", "_blank");
      handleDirectCommand(command, "Opening WhatsApp.");
    } else if (command.includes("open") && command.includes("spotify")) {
      window.open("https://www.spotify.com/", "_blank");
      handleDirectCommand(command, "Opening Spotify.");
    } else {
      aiResponse(command, true); // General AI response (will add to history inside aiResponse)
    }
  }

  const clearConversation = () => {
    setConversation([]);
    setPrompt("listening..."); // Reset prompt to default
    setResponse(false);
    setSpeaking(false);
  };

  let value = {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse,
    aiResponse,
    conversation,
    clearConversation
  };

  return (
    <div>
      <datacontext.Provider value={value}>
        {children}
      </datacontext.Provider>
    </div>
  );
}

export default userContext;