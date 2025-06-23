import { ArrowDownTrayIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';
import VerticalCarousel from './VerticalCarousel';
import UserGuide from './UserGuide';
import AnimatedBackground from './AnimatedBackground';

const carouselImages = [
  { src: '/assets/images/sim-1.jpg', alt: 'סימולציית חייל' },
  { src: '/assets/images/sim-2.jpg', alt: 'סימולציית מסוק' },
  { src: '/assets/images/plan-1.jpg', alt: 'מדידת מרחקים' },
  { src: '/assets/images/plan-2.jpg', alt: 'מודלים תלת מימדיים' },
  { src: '/assets/images/adv-1.jpg', alt: 'קילוף מבנים' },
  { src: '/assets/images/adv-2.jpg', alt: 'תצוגת לילה' },
];

const Hero = () => {
  const [isManualOpen, setIsManualOpen] = useState(false);

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <AnimatedBackground />
      
      <motion.div 
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div 
            className="flex-1 text-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.h1 
                className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-600"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                יהלום
              </motion.h1>
              <motion.h2 
                className="text-4xl font-medium mb-8 text-gray-700 dark:text-gray-300"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                תכנון ואימון בתלת מימד
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                פלטפורמה מתקדמת המשלבת טכנולוגיות חדישות לסימולציה ותכנון מבצעי.
                מאפשרת אימון והדמיה בסביבה תלת מימדית מציאותית.
              </motion.p>
            </motion.div>

            <div className="flex gap-4 items-center justify-end">
              <motion.button
                onClick={() => setIsManualOpen(true)}
                className="group inline-flex items-center bg-white hover:bg-gray-50 px-8 py-4 rounded-full text-lg text-primary border-2 border-primary shadow-lg hover:shadow-xl transition-all dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-400 dark:border-blue-400"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              >
                <BookOpenIcon className="h-7 w-7 ml-2" />
                <span className="text-xl">מדריך למשתמש</span>
              </motion.button>

              <motion.a 
                href="#download"
                className="group inline-flex items-center bg-primary hover:bg-blue-600 px-8 py-4 rounded-full text-lg text-white shadow-lg hover:shadow-xl transition-all dark:bg-blue-600 dark:hover:bg-blue-700"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              >
                <span className="text-xl pl-2">להורדה</span>
                <ArrowDownTrayIcon className="h-7 w-7 group-hover:translate-y-1 transition-transform" />
              </motion.a>
            </div>
          </motion.div>

          {/* Vertical Carousel */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <VerticalCarousel images={carouselImages} interval={4000} />
          </motion.div>
        </div>
      </motion.div>

      {/* Diamond Logo */}
      <motion.img 
        className="absolute top-0 right-0 w-24 opacity-10 dark:opacity-5"
        src="/assets/icons/diamond.png" 
        alt="Diamond icon"
        initial={{ opacity: 0, rotate: -30 }}
        animate={{ opacity: 0.1, rotate: 0 }}
        transition={{ duration: 1 }}
      />

      <UserGuide isOpen={isManualOpen} onClose={() => setIsManualOpen(false)} />
    </div>
  );
};

export default Hero; 