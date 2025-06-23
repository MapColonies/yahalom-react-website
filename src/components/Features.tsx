import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Feature {
  title: string;
  images: {
    src: string;
    alt: string;
  }[];
}

const features: Feature[] = [
  {
    title: 'סימולציה',
    images: [
      { src: '/assets/images/sim-1.jpg', alt: 'סימולציית חייל' },
      { src: '/assets/images/sim-2.jpg', alt: 'סימולציית מסוק' },
    ],
  },
  {
    title: 'תכנון',
    images: [
      { src: '/assets/images/plan-1.jpg', alt: 'מדידת מרחקים' },
      { src: '/assets/images/plan-2.jpg', alt: 'מודלים תלת מימדיים' },
    ],
  },
  {
    title: 'פונקציות שטח מתקדמות',
    images: [
      { src: '/assets/images/adv-1.jpg', alt: 'קילוף מבנים' },
      { src: '/assets/images/adv-2.jpg', alt: 'תצוגת לילה' },
    ],
  },
];

const Features = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    })
  };

  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-3 my-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="flex flex-col space-y-5 bg-white dark:bg-gray-800 p-6 shadow-lg rounded-xl hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              <motion.h2 
                className="text-2xl font-semibold text-center dark:text-gray-200 pb-4 border-b border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {feature.title}
              </motion.h2>
              {feature.images.map((image) => (
                <motion.div
                  key={image.src}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <motion.img
                    className="h-64 w-full object-cover object-center rounded-lg cursor-pointer transition-transform"
                    src={image.src}
                    alt={image.alt}
                    onClick={() => setSelectedImage(image.src)}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <motion.button
                className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
                onClick={() => setSelectedImage(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <XMarkIcon className="h-8 w-8" />
              </motion.button>
              <motion.img
                src={selectedImage}
                alt="Full size"
                className="w-full h-auto rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700"
                onClick={(e) => e.stopPropagation()}
                layoutId={selectedImage}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Features; 