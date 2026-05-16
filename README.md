# HabitForge: Gamified Habit Tracker & AI Coach 🚀

HabitForge is a next-generation habit-tracking application that leverages the power of gamification and AI to help you build and sustain positive life changes. Evolve your habits, gain XP, level up, and receive personalized coaching from an intelligent AI mentor.

![HabitForge Dashboard](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Zustand State](https://img.shields.io/badge/Zustand-State-blue?style=for-the-badge&logo=react)
![Gemini AI](https://img.shields.io/badge/Google-Gemini_AI-orange?style=for-the-badge&logo=google)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Key Features

- **Gamified Progression**: Completing daily habits earns you +20 Experience Points (XP). Gain enough XP and you'll **Level Up**, unlocking a visually satisfying sense of progression.
- **Streak Tracking**: Maintain a hot streak by consistently completing habits day after day. The app beautifully visualizes your dedication.
- **Mood & Luck Sentiment**: Track your daily mood and receive a deterministically generated daily "Luck" rating based on your name and the current date.
- **AI Habit Coach**: A personalized AI mentor powered by `gemini-2.5-flash` that analyzes your current level, active streaks, and daily mood to provide custom, empathetic motivation.
- **Gita Wisdom Integration**: Feeling stressed or lost? The specialized Gita interface queries a local Bhagavad Gita PDF to find the exact ancient Shloka that applies to your modern struggles, complete with Sanskrit text and multilingual translations.
- **Persistent Local Storage**: Your progress is safely and persistently stored in your browser using Zustand local storage.

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS & Framer Motion (for buttery smooth animations)
- **State Management**: Zustand (with Persist Middleware)
- **AI Integration**: Google Gen AI SDK (`@google/genai`) 
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and npm installed on your machine.
You will also need a **Gemini API Key** from Google AI Studio.

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/Jaimindeveloper/gamified_habit_builder.git
   cd gamified_habit_builder/habit-builder
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   Create a `.env.local` file in the `habit-builder` directory and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

4. Add the Gita PDF (Optional but recommended):
   Place your complete Bhagavad Gita PDF file in the `habit-builder/public` folder and name it `gita.pdf`.

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000` to start building habits!

## 📂 Project Structure

- `app/`: Next.js App Router pages including the main dashboard and Gita Wisdom page.
- `app/api/`: Backend Next.js API routes that interface securely with the Gemini AI model.
- `components/`: Modular React components (`HabitList`, `HabitForm`, `UserDetails`, `AICoach`).
- `store/`: Contains the global Zustand store (`useHabitStore.ts`) driving the entire application's state.
- `public/`: Static assets, including the `gita.pdf` document.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Jaimindeveloper/gamified_habit_builder/issues) if you want to contribute.

## 📜 License

This project is licensed under the MIT License.
