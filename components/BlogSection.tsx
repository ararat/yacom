import React, { useState, useEffect, useRef, useCallback } from 'react';
import BlogPost from './BlogPost';
import { useDebounce } from '../hooks/useDebounce';

interface BlogSectionProps {
  posts: Array<{
    slug: string;
    frontMatter: { [key: string]: string };
  }>;
}

// Custom hook for infinite scroll with Intersection Observer
const useInfiniteScroll = (callback: () => void, hasMore: boolean) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          callback();
        }
      },
      { 
        threshold: 0.1,      // Trigger when 10% of element is visible
        rootMargin: '200px'  // Trigger 200px before element comes into view
      }
    );
    
    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }
    
    return () => observer.disconnect();
  }, [callback, hasMore]);
  
  return triggerRef;
};

const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [visibleCount, setVisibleCount] = useState(6);
  
  // Debounce search term to improve performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Search filtering with debounced term
  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setFilteredPosts(posts);
      setVisibleCount(6); // Reset to initial count when clearing search
      return;
    }
    
    const searchLower = debouncedSearchTerm.toLowerCase();
    const filtered = posts.filter(post => {
      const title = post.frontMatter.title?.toLowerCase() || '';
      const description = post.frontMatter.description?.toLowerCase() || '';
      const tags = post.frontMatter.tags?.toLowerCase() || '';
      
      return title.includes(searchLower) || 
             description.includes(searchLower) || 
             tags.includes(searchLower);
    });
    
    setFilteredPosts(filtered);
    setVisibleCount(filtered.length); // Show all search results
  }, [debouncedSearchTerm, posts]);

  // Infinite scroll logic - only for non-search mode
  const hasMore = !debouncedSearchTerm && visibleCount < filteredPosts.length;
  
  const loadMore = useCallback(() => {
    setVisibleCount(prev => {
      const newCount = Math.min(prev + 6, filteredPosts.length);
      return newCount;
    });
  }, [filteredPosts.length]);
  
  const triggerRef = useInfiniteScroll(loadMore, hasMore);
  
  const visiblePosts = debouncedSearchTerm ? filteredPosts : filteredPosts.slice(0, visibleCount);

  return (
    <div className="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-20 sm:pt-24 pb-16 text-gray-900 dark:text-dark-text">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center text-gray-800 dark:text-dark-text mb-8 sm:mb-12 transition-colors duration-300">
        Recent Thoughts
        {debouncedSearchTerm && (
          <span className="block text-lg sm:text-xl font-normal text-gray-600 mt-2">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'} found
          </span>
        )}
      </h2>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search thoughts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 text-gray-700 dark:text-dark-text bg-white dark:bg-dark-surface border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            aria-label="Search blog posts"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg 
              className="w-5 h-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Posts Grid with Pagination */}
      {visiblePosts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 auto-rows-fr">
            {visiblePosts.map(({ slug, frontMatter: { title, description, thumbnail } }) => (
              <BlogPost
                key={slug}
                title={title}
                slug={slug}
                description={description}
                path={`/blog/${slug}`}
                imageSrc={thumbnail}
                className="w-full"
              />
            ))}
          </div>

          {/* Intersection Observer Trigger - Invisible element for infinite scroll */}
          {hasMore && (
            <div 
              ref={triggerRef} 
              className="h-4 w-full mt-8" 
              aria-hidden="true"
            />
          )}
        </>
      ) : (
        // Empty State
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg 
              className="w-12 h-12 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.9.785-5.291 2.09M6.343 6.343A8.014 8.014 0 0112 4.001c1.798 0 3.453.484 4.898 1.314M4.929 19.071A9.969 9.969 0 0112 21c2.058 0 4.015-.624 5.657-1.757M3.515 14.485A9.962 9.962 0 013 12c0-5.523 4.477-10 10-10s10 4.477 10 10a9.963 9.963 0 01-.515 2.485" 
              />
            </svg>
          </div>
          <p className="text-xl text-gray-600 mb-2">No thoughts found</p>
          <p className="text-gray-500">
            {debouncedSearchTerm ? (
              <>
                No results matching <span className="font-semibold">&quot;{debouncedSearchTerm}&quot;</span>
                <br />
                <button 
                  onClick={() => setSearchTerm('')}
                  className="text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
                >
                  Clear search to see all thoughts
                </button>
              </>
            ) : (
              'Check back later for new thoughts and insights'
            )}
          </p>
        </div>
      )}

      {/* Search Tips */}
      {debouncedSearchTerm && filteredPosts.length > 0 && (
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Tip: Search by title, description, or tags to find specific topics
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogSection;