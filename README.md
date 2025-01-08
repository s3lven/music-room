# Music Room - Real-time Music Listening Platform

A real-time web application that allows users to create virtual rooms and listen to music together. Users can join rooms, chat with others, and enjoy synchronized music playback from YouTube.

## 🚀 Planned Features 

- **Room Management**
  - Create and join music rooms
  - Real-time user presence
  - Room chat functionality

- **Music Player**
  - YouTube integration
  - Synchronized playback across all users in a room
  - Music queue system
  - Basic player controls (play, pause, seek)

- **Real-time Communication**
  - Live chat in rooms
  - Real-time music synchronization
  - User presence indicators

## 🛠️ Tech Stack

- **Frontend**
  - Next.js
  - Socket.IO Client
  - YouTube iFrame API (planned)
  - TailwindCSS

- **Backend**
  - Express.js
  - Socket.IO
  - MongoDB/PostgreSQL (planned)
  - Node.js

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm
- MongoDB/PostgreSQL (planned)
- YouTube Data API Key (planned)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/s3lven/music-room.git
   cd music-room
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

<!-- 3. **Environment Setup**
   
   Create `.env` files in both frontend and backend directories:

   Backend `.env`:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=http://localhost:3000
   ```

   Frontend `.env.local`:
   ```
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
   NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
   ``` -->

3. **Start the application**
   ```bash
   # Start backend
   cd backend
   npm run dev

   # Start frontend (in a new terminal)
   cd frontend
   npm run dev
   ```

<!-- ## 📁 Project Structure

### Backend
```
src/
├── config/        # Configuration files
├── controllers/   # Route controllers
├── events/        # Socket.IO event handlers
├── models/        # Database models 
├── routes/        # API routes
├── services/      # Business logic
├── middleware/    # Custom middleware
├── utils/         # Helper functions
└── app.js         # Main application file
```

### Frontend
```
src/
├── components/    # React components
├── contexts/      # React contexts
├── hooks/         # Custom hooks
├── pages/         # Next.js pages
├── services/      # API services
├── styles/        # CSS styles
└── utils/         # Helper functions
``` -->

<!-- ## 🔒 Authentication

The application uses JWT for authentication. Tokens are stored in HTTP-only cookies and verified on both HTTP and WebSocket connections. -->

<!-- ## 🎮 Socket Events

### Room Events
- `join-room`: Join a specific room
- `leave-room`: Leave current room
- `player-state-change`: Update player state
- `chat-message`: Send chat message

### Response Events
- `user-joined`: New user joined room
- `user-left`: User left room
- `update-player-state`: Player state updated
- `new-message`: New chat message received -->

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request


## 🎯 Future Improvements

- [ ] Add support for Spotify integration
- [ ] Implement private rooms
- [ ] Add user profiles
- [ ] Add playlist creation and sharing
- [ ] Implement room permissions and moderation
- [ ] Add voice chat capability

## 📧 Contact

Your Name - erizjsartiga@google.com
Project Link: [https://github.com/s3lven/music-room](https://github.com/s3lven/music-room)