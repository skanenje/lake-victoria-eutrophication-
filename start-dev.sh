#!/bin/bash

# Start both frontend and backend in development mode

echo "🚀 Starting Lake Victoria MVP with NASA Backend Integration"

# Function to cleanup background processes
cleanup() {
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

# Set trap to cleanup on script exit
trap cleanup EXIT INT TERM

# Start backend server
echo "📡 Starting NASA backend server..."
cd nasa-test
npm run server &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend server
echo "🌐 Starting Next.js frontend..."
cd ..
npm run dev &
FRONTEND_PID=$!

echo "✅ Servers started!"
echo "📡 Backend: http://localhost:3001"
echo "🌐 Frontend: http://localhost:3000"
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait