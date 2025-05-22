
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface Habit {
  id: number;
  title: string;
  progress: number;
  streak: number;
}

interface HabitTrackerProps {
  habits: Habit[];
  onHabitProgress: (id: number) => void;
}

const HabitTracker: React.FC<HabitTrackerProps> = ({ habits, onHabitProgress }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Hábitos en Desarrollo</h2>
      <div className="space-y-4">
        {habits.map((habit) => (
          <div key={habit.id} className="glass-morphism p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{habit.title}</h3>
              <span className="text-xs font-semibold bg-xeno-purple/20 text-xeno-teal px-2 py-1 rounded-full">
                {habit.streak} días
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Progress value={habit.progress} className="flex-1" />
              <button
                onClick={() => onHabitProgress(habit.id)}
                className="bg-xeno-teal/20 hover:bg-xeno-teal/30 text-xeno-teal p-2 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitTracker;
