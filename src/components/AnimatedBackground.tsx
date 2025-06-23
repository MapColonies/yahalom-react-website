import { motion } from 'framer-motion';
import React from 'react';
import {
  MapIcon,
  GlobeAltIcon,
  MapPinIcon,
  ChartBarIcon,
  CubeTransparentIcon,
  SignalIcon,
} from '@heroicons/react/24/outline';

interface IconConfig {
  Icon: React.ComponentType<any>;
  initialPosition: { x: number; y: number };
  rotation: number;
}

const AnimatedBackground: React.FC = () => {
  // Grid configuration
  const GRID_COLS = 6;
  const GRID_ROWS = 6;
  const CELL_WIDTH = 100 / GRID_COLS;
  const CELL_HEIGHT = 100 / GRID_ROWS;
  
  const baseIcons: IconConfig[] = [
    { 
      Icon: MapIcon,
      initialPosition: { x: 10, y: 20 },
      rotation: 15
    },
    { 
      Icon: GlobeAltIcon,
      initialPosition: { x: 80, y: 60 },
      rotation: -10
    },
    { 
      Icon: MapPinIcon,
      initialPosition: { x: 70, y: 30 },
      rotation: 20
    },
    { 
      Icon: ChartBarIcon,
      initialPosition: { x: 20, y: 70 },
      rotation: -15
    },
    { 
      Icon: CubeTransparentIcon,
      initialPosition: { x: 85, y: 15 },
      rotation: 25
    },
    { 
      Icon: SignalIcon,
      initialPosition: { x: 15, y: 85 },
      rotation: -20
    }
  ];

  // Custom diamond icon as SVG
  const DiamondIcon = () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      className="w-full h-full"
    >
      <path d="M12 2L2 8l10 6 10-6-10-6zM2 16l10 6 10-6" />
    </svg>
  );

  // Custom compass icon as SVG
  const CompassIcon = () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      className="w-full h-full"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      <path d="M12 12L8 8M12 12l4 4" />
    </svg>
  );

  // Add custom icons to the icons array
  const customIcons: IconConfig[] = [
    {
      Icon: DiamondIcon,
      initialPosition: { x: 40, y: 25 },
      rotation: 30
    },
    {
      Icon: CompassIcon,
      initialPosition: { x: 60, y: 75 },
      rotation: -25
    }
  ];

  const generateIconInstances = (icons: IconConfig[]) => {
    const instances: IconConfig[] = [];
    const usedCells = new Set<string>();
    
    for (const icon of icons) {
      // Create 3 instances of each icon
      for (let i = 0; i < 3; i++) {
        let cellX: number, cellY: number, cellKey: string;
        
        // Keep trying until we find an unused cell
        do {
          cellX = Math.floor(Math.random() * GRID_COLS);
          cellY = Math.floor(Math.random() * GRID_ROWS);
          cellKey = `${cellX},${cellY}`;
        } while (usedCells.has(cellKey));
        
        // Mark this cell as used
        usedCells.add(cellKey);
        
        // Calculate position within the cell (add some randomness within the cell)
        const x = (cellX * CELL_WIDTH) + (Math.random() * (CELL_WIDTH * 0.5) + CELL_WIDTH * 0.25);
        const y = (cellY * CELL_HEIGHT) + (Math.random() * (CELL_HEIGHT * 0.5) + CELL_HEIGHT * 0.25);
        
        instances.push({
          ...icon,
          initialPosition: { x, y },
          rotation: icon.rotation + (Math.random() * 40 - 20)
        });
      }
    }
    
    return instances;
  };

  const allIcons = [...generateIconInstances(baseIcons), ...generateIconInstances(customIcons)];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {allIcons.map((icon, index) => {
        const { Icon, initialPosition, rotation } = icon;
        const moveRange = Math.min(CELL_WIDTH, CELL_HEIGHT) * 0.2; // Limit movement to 20% of cell size

        return (
          <motion.div
            key={index}
            className="absolute w-12 h-12"
            style={{
              left: `${initialPosition.x}%`,
              top: `${initialPosition.y}%`,
            }}
            animate={{
              x: [0, moveRange, -moveRange, 0],
              y: [0, -moveRange, moveRange, 0],
              rotate: [rotation, rotation + 15, rotation - 10, rotation],
              opacity: [0.3, 0.5, 0.4, 0.3]
            }}
            transition={{
              duration: 20 + index * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="text-primary/30 dark:text-blue-400/30 w-full h-full">
              <Icon />
            </div>
          </motion.div>
        );
      })}

      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-5 dark:opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};

export default AnimatedBackground; 