# Postgrad Web App

A modern web platform for postgraduates to connect, match, and form groups based on location and interests.

## Features
- User profile creation (with location)
- Discover nearby users
- Swipe to match with like-minded individuals
- Create groups from mutual matches
- One-on-one connections

## Tech Stack
- Frontend: React
- Backend: Node.js/Express
- Database: MongoDB (with Mongoose)

## Getting Started

### Backend
1. Install dependencies:
   ```sh
   cd backend
   npm install
   ```
2. Start MongoDB (local or Atlas) and set `MONGO_URI` in `.env` if needed.
3. Run the server:
   ```sh
   npm start
   ```

### Frontend
1. Install dependencies:
   ```sh
   cd client
   npm install
   ```
2. Start the React app:
   ```sh
   npm start
   ```

## API Endpoints
- `POST /profile` - Create user profile
- `PUT /profile/:id/location` - Update user location
- `GET /profile/nearby?lng=...&lat=...` - Get nearby users
- `POST /match/:id/swipe` - Swipe on a user
- `POST /match/:id/groups` - Create group from matches
- `GET /match/:id/matches` - Get one-on-one matches

## Customization
Feel free to update UI, add authentication, or enhance matching logic as needed.
