
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface RewardSystemProps {
  points: number;
  level: number;
  nextLevelPoints: number;
}

const RewardSystem: React.FC<RewardSystemProps> = ({ points, level, nextLevelPoints }) => {
  const progress = (points / nextLevelPoints) * 100;

  return (
    <div className="glass-morphism p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Sistema de Recompensas</h3>
        <span className="bg-xeno-purple/30 text-xeno-teal py-1 px-3 rounded-full text-xs font-medium">
          Nivel {level}
        </span>
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
      
      <div className="bg-xeno-purple/10 p-3 rounded-md">
        <p className="text-sm font-medium text-xeno-teal mb-1">Próxima Recompensa:</p>
        <p className="text-xs">Desbloquearás una nueva función de XENO al alcanzar el nivel {level + 1}</p>
      </div>
    </div>
  );
};

export default RewardSystem;
