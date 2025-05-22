
import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Brain, Star, Award, Circle } from "lucide-react";

interface NeuralAvatarProps {
  points: number;
  level: number;
  userName?: string;
}

interface Reward {
  id: number;
  name: string;
  pointsRequired: number;
  icon: React.ReactNode;
  unlocked: boolean;
}

const NeuralAvatar: React.FC<NeuralAvatarProps> = ({ points, level, userName = "XENO" }) => {
  const [rewards, setRewards] = useState<Reward[]>([
    { 
      id: 1, 
      name: "Fondos exclusivos", 
      pointsRequired: 100, 
      icon: <Circle className="h-4 w-4" />, 
      unlocked: false 
    },
    { 
      id: 2, 
      name: "Audio motivador", 
      pointsRequired: 500, 
      icon: <Brain className="h-4 w-4" />, 
      unlocked: false 
    },
    { 
      id: 3, 
      name: "Cupón digital", 
      pointsRequired: 1000, 
      icon: <Star className="h-4 w-4" />, 
      unlocked: false 
    },
    { 
      id: 4, 
      name: "Asesoría profesional", 
      pointsRequired: 5000, 
      icon: <Award className="h-4 w-4" />, 
      unlocked: false 
    }
  ]);

  const getLevelTitle = (level: number) => {
    const titles = ["Semilla", "Brote", "Raíces", "Expansión", "Maestría"];
    return titles[(level - 1) % titles.length];
  };

  // Update rewards based on points
  useEffect(() => {
    setRewards(prevRewards => 
      prevRewards.map(reward => ({
        ...reward,
        unlocked: points >= reward.pointsRequired
      }))
    );
  }, [points]);

  // Calculate avatar state based on level and points
  const getAvatarState = () => {
    if (level >= 5) return "maestro";
    if (level >= 4) return "avanzado";
    if (level >= 3) return "intermedio";
    if (level >= 2) return "principiante";
    return "inicial";
  };

  // Generate avatar color based on level
  const getAvatarColor = () => {
    const baseColors = [
      "from-xeno-teal/40 to-xeno-purple/40",
      "from-xeno-teal/60 to-xeno-purple/60",
      "from-xeno-teal/80 to-xeno-purple/80",
      "from-xeno-teal to-xeno-purple",
      "from-xeno-teal via-xeno-blue to-xeno-purple"
    ];
    return baseColors[Math.min(level - 1, baseColors.length - 1)];
  };

  return (
    <div className="glass-morphism p-4 rounded-lg">
      <div className="flex flex-col items-center space-y-4">
        {/* Avatar */}
        <div className="relative">
          <div className={`absolute -inset-2 bg-gradient-to-r ${getAvatarColor()} rounded-full blur-md opacity-75 animate-pulse-slow`}></div>
          <Avatar className="h-24 w-24 border-2 border-xeno-teal relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain className={`h-12 w-12 text-white ${level >= 3 ? 'animate-float' : ''}`} />
            </div>
            <AvatarFallback className="bg-xeno-dark text-xeno-teal text-xl">
              {userName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          {/* Level badge */}
          <Badge className="absolute -bottom-2 -right-2 bg-xeno-teal text-xeno-dark">
            Nivel {level}
          </Badge>
        </div>
        
        {/* User info */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-xeno-teal">{userName}</h3>
          <p className="text-sm text-gray-300">{getLevelTitle(level)} • {points} pts</p>
        </div>
        
        {/* Neural evolution state */}
        <div className="text-center px-2 py-1 bg-xeno-purple/20 rounded-full text-xs">
          Estado neuronal: {getAvatarState()}
        </div>
        
        {/* Rewards */}
        <div className="w-full space-y-2">
          <h4 className="text-sm font-medium text-gray-300">Recompensas:</h4>
          <div className="grid grid-cols-2 gap-2">
            {rewards.map((reward) => (
              <div 
                key={reward.id} 
                className={`text-xs p-2 rounded-md flex items-center gap-2 ${
                  reward.unlocked 
                    ? 'bg-xeno-teal/20 text-xeno-teal' 
                    : 'bg-gray-800/50 text-gray-400'
                }`}
              >
                {reward.icon}
                <div className="flex flex-col">
                  <span>{reward.name}</span>
                  <span className="text-[10px]">{reward.pointsRequired} pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralAvatar;
