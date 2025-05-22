
import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
  size: number;
  active: boolean;
}

interface NeuralNetworkVisualProps {
  level: number;
  points?: number;
}

const NeuralNetworkVisual: React.FC<NeuralNetworkVisualProps> = ({ level = 1, points = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Define base number of points based on level
    const baseNumPoints = 20;
    // Add more points as level increases
    const numPoints = baseNumPoints + (level * 5);
    const points: Point[] = [];
    
    // Calculate how many nodes should be active based on current points
    const activeNodesPercentage = Math.min(0.8, (level * 0.2)) + (points / 5000);
    
    for (let i = 0; i < numPoints; i++) {
      // Make some nodes active based on level and points
      const isActive = Math.random() < activeNodesPercentage;
      
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: [],
        size: isActive ? Math.random() * 2 + 2 : Math.random() * 1 + 1,
        active: isActive
      });
    }

    // Create connections between points (more dense for higher levels)
    for (let i = 0; i < numPoints; i++) {
      const numConnections = Math.floor(Math.random() * Math.max(2, level)) + 1;
      for (let j = 0; j < numConnections; j++) {
        const connectionIndex = Math.floor(Math.random() * numPoints);
        if (connectionIndex !== i && !points[i].connections.includes(connectionIndex)) {
          points[i].connections.push(connectionIndex);
        }
      }
    }

    const render = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update point positions
      points.forEach((point) => {
        point.x += point.vx;
        point.y += point.vy;
        
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
      });
      
      // Draw connections
      points.forEach((point, i) => {
        point.connections.forEach((connectionIndex) => {
          const connectedPoint = points[connectionIndex];
          const isActiveConnection = point.active && connectedPoint.active;
          
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(connectedPoint.x, connectedPoint.y);
          
          if (isActiveConnection) {
            ctx.strokeStyle = 'rgba(45, 212, 191, 0.3)'; // Brighter for active connections
            ctx.lineWidth = 0.8;
          } else {
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)'; // Dimmer for inactive
            ctx.lineWidth = 0.5;
          }
          
          ctx.stroke();
        });
      });
      
      // Draw points
      points.forEach((point) => {
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0, 
          point.x, point.y, point.size * 2
        );
        
        if (point.active) {
          gradient.addColorStop(0, 'rgba(45, 212, 191, 0.9)'); // Teal for active nodes
          gradient.addColorStop(1, 'rgba(45, 212, 191, 0)');
        } else {
          gradient.addColorStop(0, 'rgba(99, 102, 241, 0.6)'); // Purple for inactive
          gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
        }
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [level, points]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 opacity-40"
    />
  );
};

export default NeuralNetworkVisual;
