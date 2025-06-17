# 🧠 Mimico – AI-Powered Virtual Assistant (React + Gemini Pro)

Live: [mimico-advanced-virtual-assistant.netlify.app](https://mimico-advanced-virtual-assistant.netlify.app)

Mimico is a responsive, voice-controlled virtual assistant web application built with React.js. It leverages Google Gemini AI for intelligent responses and the Web Speech API for voice recognition and text-to-speech functionality. It supports both text and voice input, and includes real-time command execution like opening websites.

---

## 🚀 Features

- 🎙️ Voice input using Web Speech API  
- 📢 Text-to-speech responses  
- 🤖 Gemini AI (Google Generative AI) powered conversations  
- 💬 Chat history with speaker icons (user, AI, errors)  
- ⏺️ Text command support alongside voice  
- 🌐 Direct command execution (e.g., open YouTube, Google)  
- ♻️ Clear conversation history button  
- ⚡ Smooth scrolling to the latest message  

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite  
- **AI Backend**: Google Gemini Pro via `@google/generative-ai`  
- **Voice Integration**: Web Speech API (Speech Recognition & Speech Synthesis)  
- **Icons**: React Icons  
- **UI**: HTML, CSS (custom styling)  

---

## 🧱 Folder Structure


📁 MY_AI
│
├── 📁 src
│   ├── 📁 assets              # Static files (images, GIFs)
│   │   ├── ai voice.png
│   │   ├── ai.png
│   │   ├── aiVoice.gif
│   │   ├── logo.png
│   │   └── speak.gif
│   ├── 📁 context             # Context API logic
│   │   └── UserContext.jsx
│   ├── App.css                # Global styles
│   ├── App.jsx                # Main component
│   ├── gemini.js              # Gemini API integration
│   ├── index.css              # Root-level styles
│   ├── index.jsx              # Entry point
│   └── main.jsx               # App setup logic
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md

---

## 📦 Installation & Running the App


### 1. Clone the Repository

git clone https://github.com/adiTyaIcHe07/mimico-advanced-virtual-assistant.git
cd mimico-advanced-virtual-assistant

2. Install Dependencies

npm install
3. Add Your API Key

Edit the run.js file and replace the placeholder API key with your actual Google Generative AI API key:
let apiKey = "YOUR_GOOGLE_GEN_AI_KEY";
⚠️ Important: Never expose your API key in public repositories. Use .env for production environments.

4. Start the Development Server

npm run dev
Then open your browser at http://localhost:5173

---

🎤 Available Voice Commands


Command	Action
open YouTube	Opens youtube.com
open Google	Opens google.com
open Facebook / Twitter	Opens respective sites
open Gmail / WhatsApp	Opens respective sites
Any other sentence	Gets AI response

---

📚 Future Enhancements


🔐 User authentication (JWT, Firebase, or OAuth)

🌍 Multilingual support (using react-i18next)

📱 PWA version for mobile assistant

🧠 Custom command training

