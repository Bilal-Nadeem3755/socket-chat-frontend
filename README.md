# Socket Chat App — Frontend

A real-time chat application frontend built with **React**, **Vite**, and **Socket.IO client package support**. The app includes account registration and login, room joining, live messaging over the browser WebSocket API, online-user updates, typing indicators, unread-message tracking, and chat notifications.

> **Backend required:** This frontend depends on the Socket Chat FastAPI backend. Start the backend before using login, message history, or real-time chat.

## Features

- User registration and login
- Stores the authenticated user and access token in browser `localStorage`
- Join a chat room by entering a room name
- Real-time messages over a WebSocket connection
- Loads previous room messages through the backend REST API
- Online-user list and live presence updates
- Typing indicators
- Unread-message tracking and message notifications
- Click a notification to jump to and highlight the related message
- Emoji picker
- Message timestamps and date separators
- Responsive chat interface with sidebar, chat header, message bubbles, and input area
- Logout and WebSocket disconnection

## Tech Stack

- React
- JavaScript (ES modules)
- Vite
- Tailwind CSS v4 / `@tailwindcss/vite` (dependency included)
- Browser WebSocket API for real-time messaging
- `socket.io-client` package (included as a dependency; the current socket connection code uses the native browser `WebSocket` API)
- `emoji-picker-react`
- `lucide-react`

## Project Structure

```text
client/
├── public/
├── src/
│   ├── api/
│   │   └── messageApi.js
│   ├── components/
│   │   ├── Avatar.jsx
│   │   ├── ChatHeader.jsx
│   │   ├── ChatInput.jsx
│   │   ├── ChatMessages.jsx
│   │   ├── DateSeparator.jsx
│   │   ├── JoinScreen.jsx
│   │   ├── LoginScreen.jsx
│   │   ├── MessageBubble.jsx
│   │   ├── NotificationContainer.jsx
│   │   ├── NotificationToast.jsx
│   │   ├── RegisterScreen.jsx
│   │   ├── SideBar.jsx
│   │   └── TypingIndicator.jsx
│   ├── hooks/
│   │   └── useSocket.js
│   ├── pages/
│   │   └── ChatPage.jsx
│   ├── services/
│   │   └── auth.js
│   ├── socket/
│   │   └── socket.js
│   ├── utils/
│   │   └── formatDate.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Requirements

- Node.js and npm
- The Socket Chat backend running locally or deployed at a reachable URL

## Run Locally

### 1. Clone the frontend repository

```bash
git clone <YOUR_FRONTEND_REPOSITORY_URL>
cd socket-app-frontend/client
```

Replace `<YOUR_FRONTEND_REPOSITORY_URL>` with the URL of your frontend GitHub repository. If you have already opened the `client` directory, run the remaining commands there.

### 2. Install dependencies

```bash
npm install
```

### 3. Check the backend URL

The current frontend source uses `http://127.0.0.1:8000` in these files:

- `src/services/auth.js` — registration and login REST requests
- `src/api/messageApi.js` — fetches room message history
- `src/socket/socket.js` — opens a WebSocket connection at `ws://127.0.0.1:8000`

Make sure your backend is running at `127.0.0.1:8000`, or update those URLs to match your backend.

**For a deployed HTTPS frontend:** do not leave the WebSocket URL as `ws://127.0.0.1:8000`. Configure the REST API to use your deployed backend's HTTPS URL and the WebSocket connection to use its secure `wss://` URL. The backend must allow requests from the frontend origin and support WebSocket connections.

### 4. Start the frontend development server

```bash
npm run dev
```

Vite prints the local development URL in the terminal, typically `http://localhost:5173`.

### 5. Build and preview the production bundle

```bash
npm run build
npm run preview
```

## Available Scripts

```bash
npm run dev      # Start the Vite development server
npm run build    # Build the production frontend
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## How the Frontend Works

1. A user registers or logs in using the backend REST API.
2. The frontend stores the returned access token and user details in `localStorage`.
3. The user enters a room name and joins the chat.
4. The frontend opens a WebSocket connection with the room name and access token.
5. Messages and chat events update the interface in real time.
6. The frontend requests previous room messages from the backend REST API.

## Backend Integration

The frontend expects backend endpoints for registration, login, room-message history, and the room WebSocket connection. Check the backend's API documentation and implementation for the exact routes and message payload format.

## Deployment Notes

- Configure the REST and WebSocket URLs for the deployed backend before publishing the frontend.
- Use `https://` for REST API calls and `wss://` for WebSocket connections when the frontend is served over HTTPS.
- Configure the backend's CORS/origin settings for the deployed frontend.
- Do not commit private tokens, passwords, or environment files.
- Do not upload `.git`, `node_modules`, or build output as part of the source repository.
