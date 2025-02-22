# Interactive Quiz Application

A modern, interactive quiz application built with React and TypeScript, featuring multiple-choice and integer-type questions with time constraints.

## 🌐 Live Demo

Visit the live application: [Interactive Quiz](https://internshala-quiz-game.vercel.app/)

## ✨ Features

- **Mixed Question Types**
  - Multiple-choice questions with options
  - Integer-type questions for numerical answers
  
- **Time Management**
  - 30-minute total quiz duration
  - 30 seconds per question countdown
  - Visual timers with color indicators
  
- **Progress Tracking**
  - Real-time score updates
  - Question progress indicator
  - Quiz history storage using IndexedDB
  
- **User Experience**
  - Responsive design for all devices
  - Clean and intuitive interface
  - Visual feedback for time warnings
  
- **Results & History**
  - Detailed score summary
  - Historical attempts tracking
  - Option to retry the quiz

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sou6161/Internshala-quiz-game.git
   ```

2. Navigate to the project directory:
   ```bash
   cd quiz-platform
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit:
   ```
   http://localhost:5173
   ```

## 🛠️ Built With

- React - UI Framework
- TypeScript - Type Safety
- Tailwind CSS - Styling
- Vite - Build Tool
- IndexedDB - Local Storage
- Lucide React - Icons

## 📝 Quiz Structure

- 5 Multiple Choice Questions
- 5 Integer-type Questions
- 30 Minutes Total Time
- 30 Seconds Per Question
- Automatic Progression on Time Expiry

## 🎯 Features in Detail

### Time Management
- Overall quiz timer (30 minutes)
- Individual question timer (30 seconds)
- Visual warnings for low time
- Automatic submission on time expiry

### Score Tracking
- Real-time score updates
- Correct/Incorrect feedback
- Final score summary
- Historical attempt tracking

### User Interface
- Clean and modern design
- Responsive layout
- Progress indicators
- Time management visuals

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile phones

## 🔒 Local Storage

Quiz attempts are stored locally using IndexedDB, allowing users to:
- Track their progress
- View historical attempts
- Compare previous scores