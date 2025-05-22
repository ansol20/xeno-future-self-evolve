
import React, { useState } from 'react';
import NeuralNetworkVisual from './NeuralNetworkVisual';
import XenoCalendar from './XenoCalendar';
import HabitTracker from './HabitTracker';
import RewardSystem from './RewardSystem';
import XenoAssistant from './XenoAssistant';
import RoutineManager from './RoutineManager';
import MissionTracker from './MissionTracker';

const Dashboard: React.FC = () => {
  // Habits state
  const [habits, setHabits] = useState([
    { id: 1, title: 'Meditación', progress: 60, streak: 5 },
    { id: 2, title: 'Lectura diaria', progress: 40, streak: 3 },
    { id: 3, title: 'Ejercicio', progress: 80, streak: 8 },
  ]);

  // Tasks state
  const [morningTasks, setMorningTasks] = useState([
    { id: 1, title: 'Meditar 10 minutos', completed: false, timeEstimate: '10m' },
    { id: 2, title: 'Ejercicio matutino', completed: true, timeEstimate: '20m' },
    { id: 3, title: 'Revisar objetivos del día', completed: false, timeEstimate: '5m' },
  ]);

  const [eveningTasks, setEveningTasks] = useState([
    { id: 1, title: 'Leer 20 páginas', completed: false, timeEstimate: '30m' },
    { id: 2, title: 'Reflexión del día', completed: false, timeEstimate: '10m' },
    { id: 3, title: 'Preparar rutina para mañana', completed: false, timeEstimate: '5m' },
  ]);

  // Missions state
  const [missions, setMissions] = useState([
    { 
      id: 1, 
      title: 'Completa tu primer módulo', 
      description: 'Finaliza las primeras 7 tareas de tu plan', 
      completed: false, 
      points: 100,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    },
    { 
      id: 2, 
      title: 'Medita 3 días seguidos', 
      description: 'Completa 3 días consecutivos de meditación', 
      completed: false, 
      points: 50 
    },
    { 
      id: 3, 
      title: 'Crea tu rutina personalizada', 
      description: 'Configura tus propias rutinas matutina y vespertina', 
      completed: true, 
      points: 75 
    }
  ]);

  // Points and level state
  const [points, setPoints] = useState(230);
  const [level, setLevel] = useState(3);
  const nextLevelPoints = 400;

  const handleHabitProgress = (id: number) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const newProgress = Math.min(habit.progress + 10, 100);
        
        // If habit completed
        if (newProgress === 100) {
          setPoints(prev => prev + 50);
          
          // Check if level up
          if (points + 50 >= nextLevelPoints) {
            setLevel(prev => prev + 1);
          }
          
          return {
            ...habit,
            progress: 0,
            streak: habit.streak + 1,
          };
        }
        
        return {
          ...habit,
          progress: newProgress,
        };
      }
      return habit;
    }));
    
    // Small points for progress
    setPoints(prev => prev + 5);
  };

  const handleToggleTask = (id: number, time: 'morning' | 'evening') => {
    if (time === 'morning') {
      setMorningTasks(morningTasks.map(task => {
        if (task.id === id) {
          // Add points when completing a task
          if (!task.completed) {
            setPoints(prev => prev + 10);
          }
          
          return {
            ...task,
            completed: !task.completed
          };
        }
        return task;
      }));
    } else {
      setEveningTasks(eveningTasks.map(task => {
        if (task.id === id) {
          // Add points when completing a task
          if (!task.completed) {
            setPoints(prev => prev + 10);
          }
          
          return {
            ...task,
            completed: !task.completed
          };
        }
        return task;
      }));
    }
  };
  
  const handleToggleMission = (id: number) => {
    setMissions(missions.map(mission => {
      if (mission.id === id) {
        // Add points when completing a mission
        if (!mission.completed) {
          const newPoints = points + mission.points;
          setPoints(newPoints);
          
          // Check if level up
          if (newPoints >= nextLevelPoints) {
            setLevel(prev => prev + 1);
          }
        }
        
        return {
          ...mission,
          completed: !mission.completed
        };
      }
      return mission;
    }));
  };

  return (
    <div className="relative min-h-screen w-full max-w-md mx-auto bg-xeno-dark p-4 overflow-y-auto">
      {/* Neural network background */}
      <div className="relative h-full w-full">
        <NeuralNetworkVisual level={level} points={points} />
        
        <div className="relative z-10 space-y-6 pb-20">
          {/* Header */}
          <div className="glass-morphism rounded-lg p-4 text-center mb-6">
            <h1 className="text-3xl font-bold text-gradient">XENO</h1>
            <p className="text-sm text-gray-300">Tu asistente para el yo del futuro</p>
          </div>
          
          {/* Calendar */}
          <XenoCalendar currentDate={new Date()} />
          
          {/* Routine Manager */}
          <RoutineManager 
            morningTasks={morningTasks} 
            eveningTasks={eveningTasks} 
            onToggleTask={handleToggleTask} 
          />
          
          {/* Habits Tracker */}
          <HabitTracker habits={habits} onHabitProgress={handleHabitProgress} />
          
          {/* Mission Tracker (New) */}
          <MissionTracker missions={missions} onToggleMission={handleToggleMission} />
          
          {/* Reward System */}
          <RewardSystem points={points} level={level} nextLevelPoints={nextLevelPoints} />
          
          {/* XENO Assistant */}
          <div className="glass-morphism rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Asistente XENO</h2>
            <XenoAssistant />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
