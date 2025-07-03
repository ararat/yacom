import React from 'react';
import Link from 'next/link';

interface BlogPostNavigationProps {
  postTitle: string;
}

const BlogPostNavigation: React.FC<BlogPostNavigationProps> = ({ 
  postTitle 
}) => {
  return (
    <>
      {/* Breadcrumb Navigation - Center */}
      <nav aria-label="Breadcrumb" className="flex-1 flex justify-center mx-4">
        <ol className="flex items-center space-x-2 text-sm text-gray-300">
          <li>
            <Link 
              href="/"
              className="hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li className="text-gray-500">/</li>
          <li>
            <Link 
              href="/#blog"
              className="hover:text-white transition-colors duration-200"
            >
              Thoughts
            </Link>
          </li>
          <li className="text-gray-500">/</li>
          <li className="text-white font-medium truncate max-w-xs sm:max-w-md">
            {postTitle}
          </li>
        </ol>
      </nav>

      {/* Back to Blog Button - Right */}
      <Link 
        href="/#blog"
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 text-sm font-medium flex-shrink-0"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Thoughts
      </Link>
    </>
  );
};

export default BlogPostNavigation;