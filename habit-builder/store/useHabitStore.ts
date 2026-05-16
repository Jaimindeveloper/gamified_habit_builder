import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Habit {
  id: string;
  title: string;
  description?: string;
  streak: number;
  lastCompleted: string | null;
}

interface HabitState {
  habits: Habit[];
  xp: number;
  level: number;
  userName: string;
  mood: string;
  addHabit: (title: string, description: string) => void;
  deleteHabit: (id: string) => void;
  toggleHabit: (id: string) => void;
  setUserName: (name: string) => void;
  setMood: (mood: string) => void;
}

const XP_PER_LEVEL = 100;
const XP_PER_HABIT = 20;

export const useHabitStore = create<HabitState>()(
  persist(
    (set, get) => ({
      habits: [],
      xp: 0,
      level: 1,
      userName: '',
      mood: '😊 Happy',

      setUserName: (name: string) => set({ userName: name }),
      setMood: (mood: string) => set({ mood }),

      addHabit: (title: string, description: string) => {
        const newHabit: Habit = {
          id: Math.random().toString(36).substring(2, 9),
          title,
          description,
          streak: 0,
          lastCompleted: null,
        };
        set((state) => ({ habits: [...state.habits, newHabit] }));
      },

      deleteHabit: (id: string) => {
        set((state) => ({ habits: state.habits.filter((h) => h.id !== id) }));
      },

      toggleHabit: (id: string) => {
        const today = new Date().toISOString().split('T')[0];
        set((state) => {
          let gainedXp = 0;
          
          const newHabits = state.habits.map((habit) => {
            if (habit.id === id) {
              const isCompletedToday = habit.lastCompleted 
                ? habit.lastCompleted.split('T')[0] === today 
                : false;

              if (isCompletedToday) {
                // Untoggle: remove today's completion (lose XP)
                gainedXp = -XP_PER_HABIT;
                return {
                  ...habit,
                  streak: Math.max(0, habit.streak - 1),
                  lastCompleted: null // Simplified for this demo
                };
              } else {
                // Toggle complete: add XP
                gainedXp = XP_PER_HABIT;
                return {
                  ...habit,
                  streak: habit.streak + 1,
                  lastCompleted: new Date().toISOString()
                };
              }
            }
            return habit;
          });

          if (gainedXp === 0) return { habits: newHabits };

          const newTotalXp = Math.max(0, state.xp + gainedXp);
          const newLevel = Math.max(1, Math.floor(newTotalXp / XP_PER_LEVEL) + 1);

          return {
            habits: newHabits,
            xp: newTotalXp,
            level: newLevel,
          };
        });
      },
    }),
    {
      name: 'habit-storage',
    }
  )
);
