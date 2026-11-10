import React from 'react';

interface FooterProps {
  siteTitle: string;
}

const Footer: React.FC<FooterProps> = ({ siteTitle }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-dark-bg border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500 dark:text-dark-text-secondary">
          &copy; {year} {siteTitle}. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/ararat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 dark:text-dark-text-secondary hover:text-blue-600 transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href="/#blog"
            className="text-sm text-gray-500 dark:text-dark-text-secondary hover:text-blue-600 transition-colors duration-200"
          >
            Thoughts
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
