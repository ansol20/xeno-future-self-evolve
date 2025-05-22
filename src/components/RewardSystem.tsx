
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface RewardSystemProps {
  points: number;
  level: number;
  nextLevelPoints: number;
}

const RewardSystem: React.FC<RewardSystemProps> = ({ points, level, nextLevelPoints }) => {
  const progress = (points / nextLevelPoints) * 100;
  
  // Define rewards based on levels
  const getNextReward = (level: number) => {
    const rewards = [
      "Fondos de pantalla exclusivos",
      "Audio motivador personalizado",
      "Cupón para productos digitales",
      "Asesoría con profesional",
      "Acceso a club privado de evolución"
    ];
    return rewards[(level - 1) % rewards.length]; 
  };
  
  // Define level titles
  const getLevelTitle = (level: number) => {
    const titles = ["Semilla", "Brote", "Raíces", "Expansión", "Maestría"];
    return titles[(level - 1) % titles.length];
  };

  return (
    <div className="glass-morphism p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Sistema de Recompensas</h3>
        <Badge variant="secondary" className="bg-xeno-purple/30 text-xeno-teal">
          Nivel {level} - {getLevelTitle(level)}
        </Badge>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span>{points} puntos</span>
          <span>{nextLevelPoints} puntos</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <p className="text-sm text-gray-400 mb-3">
        Faltan {nextLevelPoints - points} puntos para el siguiente nivel
      </p>
      
      <div className="bg-xeno-purple/10 p-3 rounded-md mb-3">
        <p className="text-sm font-medium text-xeno-teal mb-1">Próxima Recompensa:</p>
        <p className="text-xs">
          {getNextReward(level + 1)} al alcanzar el nivel {level + 1}
        </p>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {[100, 500, 1000, 5000].map((milestone, index) => (
          <div 
            key={index}
            className={`text-center p-2 rounded-md text-xs ${
              points >= milestone ? 'bg-xeno-teal/20 text-xeno-teal' : 'bg-gray-800/50 text-gray-400'
            }`}
          >
            {milestone}
            <div className="mt-1">
              {points >= milestone ? (
                <span className="text-[10px]">Desbloqueado</span>
              ) : (
                <span className="text-[10px]">Bloqueado</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardSystem;
