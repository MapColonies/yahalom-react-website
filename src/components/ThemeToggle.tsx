import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="relative p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      initial={false}
      animate={{ rotate: isDarkMode ? 360 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {isDarkMode ? (
        <MoonIcon className="w-6 h-6 text-yellow-500" />
      ) : (
        <SunIcon className="w-6 h-6 text-yellow-500" />
      )}
    </motion.button>
  );
}; 