import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface UserManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserManualModal = ({ isOpen, onClose }: UserManualModalProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative w-full h-full max-w-7xl mx-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
        >
          <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
        
        <iframe
          src="/NG User Manual/NGUserManual.html"
          className="w-full h-full pt-16 pb-4 px-4"
          title="NG User Manual"
        />
      </div>
    </motion.div>
  );
};

export default UserManualModal; 