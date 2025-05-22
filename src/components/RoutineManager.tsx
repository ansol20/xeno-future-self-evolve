
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RoutineTask {
  id: number;
  title: string;
  completed: boolean;
  timeEstimate: string;
}

interface RoutineProps {
  morningTasks: RoutineTask[];
  eveningTasks: RoutineTask[];
  onToggleTask: (id: number, time: 'morning' | 'evening') => void;
}

const RoutineManager: React.FC<RoutineProps> = ({ morningTasks, eveningTasks, onToggleTask }) => {
  return (
    <Card className="glass-morphism p-4">
      <h2 className="text-xl font-bold mb-4">Mis Rutinas</h2>
      
      <Tabs defaultValue="morning" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="morning">Mañana</TabsTrigger>
          <TabsTrigger value="evening">Noche</TabsTrigger>
        </TabsList>
        
        <TabsContent value="morning" className="space-y-3">
          {morningTasks.map((task) => (
            <div 
              key={task.id} 
              className="flex items-center justify-between p-3 rounded-lg bg-xeno-purple/10 hover:bg-xeno-purple/20"
              onClick={() => onToggleTask(task.id, 'morning')}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border ${task.completed ? 'bg-xeno-teal border-xeno-teal' : 'border-gray-400'} flex items-center justify-center`}>
                  {task.completed && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={task.completed ? 'line-through text-gray-400' : ''}>{task.title}</span>
              </div>
              <span className="text-xs text-gray-400">{task.timeEstimate}</span>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="evening" className="space-y-3">
          {eveningTasks.map((task) => (
            <div 
              key={task.id} 
              className="flex items-center justify-between p-3 rounded-lg bg-xeno-purple/10 hover:bg-xeno-purple/20"
              onClick={() => onToggleTask(task.id, 'evening')}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border ${task.completed ? 'bg-xeno-teal border-xeno-teal' : 'border-gray-400'} flex items-center justify-center`}>
                  {task.completed && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={task.completed ? 'line-through text-gray-400' : ''}>{task.title}</span>
              </div>
              <span className="text-xs text-gray-400">{task.timeEstimate}</span>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default RoutineManager;
