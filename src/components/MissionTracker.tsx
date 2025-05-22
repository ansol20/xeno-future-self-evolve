
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle } from "lucide-react";

interface Mission {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  points: number;
  dueDate?: Date;
}

interface MissionTrackerProps {
  missions: Mission[];
  onToggleMission: (id: number) => void;
}

const MissionTracker: React.FC<MissionTrackerProps> = ({ missions, onToggleMission }) => {
  const activeMissions = missions.filter(mission => !mission.completed);
  const completedMissions = missions.filter(mission => mission.completed);
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Misiones Semanales</h2>
      
      <div className="space-y-4">
        <div className="glass-morphism p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Misiones Activas</h3>
          
          {activeMissions.length === 0 ? (
            <p className="text-gray-400 text-sm py-2">No hay misiones activas.</p>
          ) : (
            <div className="space-y-3">
              {activeMissions.map((mission) => (
                <div 
                  key={mission.id}
                  className="bg-xeno-purple/10 p-3 rounded-lg hover:bg-xeno-purple/20 transition-colors cursor-pointer"
                  onClick={() => onToggleMission(mission.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Circle className="h-5 w-5 text-xeno-teal" />
                      <h4 className="font-medium">{mission.title}</h4>
                    </div>
                    <Badge variant="outline" className="bg-xeno-purple/20 text-xeno-teal border-none">
                      +{mission.points} pts
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-gray-400 mt-1 ml-7">{mission.description}</p>
                  
                  {mission.dueDate && (
                    <p className="text-xs text-gray-400 mt-2 ml-7">
                      Vence: {mission.dueDate.toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {completedMissions.length > 0 && (
          <div className="glass-morphism p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Misiones Completadas</h3>
            
            <div className="space-y-3">
              {completedMissions.map((mission) => (
                <div 
                  key={mission.id}
                  className="bg-xeno-teal/5 p-3 rounded-lg"
                  onClick={() => onToggleMission(mission.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-xeno-teal" />
                      <h4 className="font-medium text-gray-400">{mission.title}</h4>
                    </div>
                    <Badge variant="outline" className="bg-xeno-teal/20 text-xeno-teal border-none">
                      +{mission.points} pts
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionTracker;
