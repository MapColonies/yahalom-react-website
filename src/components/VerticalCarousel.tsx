import { motion, useMotionValue, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CarouselImage {
  src: string;
  alt: string;
  userInfo: {
    username: string;
    profilePic: string;
    isFollowing?: boolean;
  };
  description: string;
  hashtags: string[];
}

interface VerticalCarouselProps {
  images: CarouselImage[];
  interval?: number;
}

const VerticalCarousel: React.FC<VerticalCarouselProps> = ({ images, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const y = useMotionValue(0);
  const controls = useAnimation();

  const clampIndex = (index: number) => {
    const len = images.length;
    return (index + len) % len;
  };

  const paginate = (direction: number) => {
    const nextIndex = clampIndex(currentIndex + direction);
    setCurrentIndex(nextIndex);
    controls.start({ y: 0 }); // reset drag offset
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, interval]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{ y }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          const offset = info.offset.y;
          const velocity = info.velocity.y;

          const threshold = 100;
          const velocityThreshold = 500;

          if (offset < -threshold || velocity < -velocityThreshold) {
            paginate(1);
          } else if (offset > threshold || velocity > velocityThreshold) {
            paginate(-1);
          } else {
            controls.start({ y: 0 });
          }
        }}
        animate={controls}
      >
        {[-1, 0, 1].map((offset) => {
          const index = clampIndex(currentIndex + offset);
          const image = images[index];

          return (
            <div
              key={index}
              className="absolute top-0 left-0 w-full h-full"
              style={{ transform: `translateY(${offset * 100}%)` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 pb-4 text-white bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                    <img
                      src={image.userInfo.profilePic}
                      alt={`${image.userInfo.username}'s profile`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-3 mr-3 flex-grow">
                    <h3 className="font-semibold text-lg">
                      {image.userInfo.username}
                    </h3>
                  </div>
                  <button
                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                      image.userInfo.isFollowing
                        ? 'bg-gray-600 text-white'
                        : 'bg-white text-black'
                    }`}
                  >
                    {image.userInfo.isFollowing ? 'במעקב' : 'עקוב'}
                  </button>
                </div>

                <div className="space-y-2">
                  <p className="text-sm leading-relaxed">{image.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {image.hashtags.map((tag, i) => (
                      <span key={i} className="text-sm font-medium text-blue-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default VerticalCarousel;
