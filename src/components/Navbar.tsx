import { motion } from 'framer-motion';
import { ChatBubbleLeftIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-md"
    >
      <div className="mx-auto px-8 py-4">
        <div className="flex flex-row justify-between items-center">
          <nav>
            <ul className="flex items-center gap-x-8 text-lg">
              <motion.li
                whileHover={{ scale: 1.05 }}
                className="flex flex-row items-center pe-5 border-e border-gray-200 dark:border-gray-700"
              >
                <img className="h-8" src="/assets/icons/map-colonies.png" alt="map-colonies icon" />
                <span className="text-xl font-medium mx-3 dark:text-gray-200">ליבות המיפוי</span>
                <img className="h-8" src="/assets/icons/dekel-team.png" alt="Diamond icon" />
                <span className="text-xl font-medium dark:text-gray-200">צוות דקל</span>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.05 }}
                className="flex flex-row items-center hover:text-primary transition-colors dark:text-gray-200"
              >
                <ChatBubbleLeftIcon className="h-6 w-6 ml-2" />
                <a href="#support-chat">
                  <span>צ'אט תמיכה ועדכונים</span>
                </a>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.05 }}
                className="flex flex-row items-center dark:text-gray-200"
              >
                <PhoneIcon className="h-6 w-6 ml-2" />
                <span>מספר אדום לתמיכה: 612-2124</span>
              </motion.li>
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <motion.div
              whileHover={{ scale: 1.05 }}
              dir="ltr"
              className="flex items-center text-xl dark:text-gray-200"
            >
              <img className="h-7 pr-1" src="/assets/icons/diamond.png" alt="Diamond icon" />
              <span>יהלום</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar; 