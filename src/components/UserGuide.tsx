import { useState, useEffect, useRef } from 'react';
import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ReactDOM from 'react-dom';

interface UserGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TabContent {
  name: string;
  content: string;
}

const UserGuide = ({ isOpen, onClose }: UserGuideProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [markdownContent, setMarkdownContent] = useState('');
  const [tabs, setTabs] = useState<TabContent[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/content/user-guide/basic-usage.md');
        const content = await response.text();
        setMarkdownContent(content);
        
        // Parse headers and content sections
        const sections = content.split(/(?=^## )/m).filter(Boolean);
        const parsedTabs = sections.map(section => {
          const lines = section.split('\n');
          const name = lines[0].replace(/^## /, '').trim();
          return {
            name,
            content: section
          };
        });
        
        setTabs(parsedTabs);
      } catch (error) {
        console.error('Error loading markdown content:', error);
        setMarkdownContent('Error loading content...');
      }
    };

    fetchContent();
  }, []);

  const renderMarkdown = (content: string): Promise<string> => {
    return new Promise((resolve) => {
      const div = document.createElement('div');
      div.className = 'markdown-preview';
      
      const reactRoot = document.createElement('div');
      const markdownElement = (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            img: ({ src, alt }) => (
              <img
                src={src}
                alt={alt}
                className="w-full max-w-2xl mx-auto my-4 rounded-lg shadow-lg"
              />
            )
          }}
        >
          {content}
        </ReactMarkdown>
      );
      
      ReactDOM.render(markdownElement, reactRoot);
      div.innerHTML = reactRoot.innerHTML;
      resolve(div.innerHTML);
    });
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative w-full h-full max-w-7xl mx-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          >
            <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="h-full flex">
          {/* Side Menu */}
          <div className="w-64 mt-12 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <Tab.Group vertical selectedIndex={selectedTab} onChange={setSelectedTab}>
              <Tab.List className="flex flex-col space-y-2 p-4">
                {tabs.map((tab, index) => (
                  <Tab
                    key={index}
                    className={({ selected }) =>
                      `px-4 py-3 text-sm font-medium rounded-md focus:outline-none transition-colors text-right ${
                        selected
                          ? 'bg-primary text-white dark:bg-blue-600 shadow-md'
                          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                      }`
                    }
                  >
                    {tab.name}
                  </Tab>
                ))}
              </Tab.List>
            </Tab.Group>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6" ref={contentRef}>
            <div className="max-w-3xl mx-auto prose dark:prose-invert prose-img:rounded-lg prose-img:shadow-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  img: ({ src, alt }) => (
                    <img
                      src={src}
                      alt={alt}
                      className="w-full max-w-2xl mx-auto my-4 rounded-lg shadow-lg"
                    />
                  )
                }}
              >
                {tabs[selectedTab]?.content || ''}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserGuide; 