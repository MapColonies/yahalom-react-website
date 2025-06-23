import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CarouselImage {
  src: string;
  alt: string;
}

interface VerticalCarouselProps {
  images: CarouselImage[];
  interval?: number;
}

const VerticalCarousel: React.FC<VerticalCarouselProps> = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative h-[600px] w-[337.5px] overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentIndex}
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </AnimatePresence>
      
      {/* Progress Indicators */}
      <div className="absolute top-4 right-4 flex flex-col gap-1">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-1 h-6 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-y-100'
                : 'bg-white/50 scale-y-75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default VerticalCarousel; 