#!/bin/bash

# Portfolio Setup Script
echo "🚀 Setting up Rushikesh Hulage Portfolio..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    
    # Start development server
    echo "🌐 Starting development server..."
    npm run dev
else
    echo "❌ Failed to install dependencies. Please check your Node.js installation."
    exit 1
fi
