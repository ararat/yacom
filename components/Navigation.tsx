import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import StandardNavigation from "./StandardNavigation";
import BlogPostNavigation from "./BlogPostNavigation";

interface NavigationSection {
  id: string;
  navTitle: string;
  enabled: boolean;
}

interface StandardNavigationProps {
  variant: "standard";
  SiteTitle: string;
  SiteDescription: string;
  sections?: NavigationSection[];
}

interface BlogPostNavigationProps {
  variant: "blogPost";
  siteTitle: string;
  postTitle: string;
}

type NavigationProps = StandardNavigationProps | BlogPostNavigationProps;

const Navigation: React.FC<NavigationProps> = (props) => {
  // State for mobile menu (only used for standard navigation)
  const [navbar, setNavbar] = useState(false);
  const router = useRouter();

  // Get site title from either prop structure
  const siteTitle =
    props.variant === "standard" ? props.SiteTitle : props.siteTitle;

  // Handle site title click for scroll-to-top behavior
  const handleSiteTitleClick = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      router.push("/").then(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  };

  // Generate structured data for blog posts
  const blogPostStructuredData =
    props.variant === "blogPost"
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://yuvalararat.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Thoughts",
              item: "https://yuvalararat.com/#blog",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: props.postTitle,
              item: typeof window !== "undefined" ? window.location.href : "",
            },
          ],
        }
      : null;

  if (props.variant === "blogPost") {
    return (
      <>
        {/* Structured data for blog posts */}
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(blogPostStructuredData),
            }}
          />
        </Head>

        {/* Blog post navigation */}
        <nav 
          className="fixed top-0 left-0 right-0 bg-slate-800/95 dark:bg-dark-surface/95 backdrop-blur-sm text-white py-4 z-50 shadow-lg transition-all duration-300"
          role="navigation"
          aria-label="Blog post navigation"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between">
              {/* Site Title - Left */}
              <h1 className="text-xl sm:text-2xl font-bold flex-shrink-0">
                <Link
                  href="/"
                  className="hover:text-blue-300 transition-colors duration-200 focus:ring-2 focus:ring-blue-300 focus:outline-none rounded-md px-2 py-1 -mx-2 -my-1"
                  onClick={handleSiteTitleClick}
                  aria-label={`${siteTitle} - Return to homepage`}
                >
                  {siteTitle}
                </Link>
              </h1>

              {/* Sub-component content */}
              <BlogPostNavigation postTitle={props.postTitle} />
            </div>
          </div>
        </nav>
      </>
    );
  }

  // Standard navigation
  return (
    <nav 
      className="fixed top-0 left-0 right-0 bg-slate-800/95 dark:bg-dark-surface/95 backdrop-blur-sm text-white py-2 z-50 shadow-lg transition-all duration-300"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex justify-between px-4 sm:px-6 mx-auto w-full md:items-center">
        {/* Site Title */}
        <div className="flex items-center py-2 md:py-3">
          <h2 className="text-xl sm:text-2xl text-white font-bold hover:text-blue-300 transition-colors duration-200">
            <Link 
              href="/" 
              className="block focus:ring-2 focus:ring-blue-300 focus:outline-none rounded-md px-2 py-1 -mx-2 -my-1" 
              onClick={handleSiteTitleClick}
              aria-label={`${siteTitle} - Return to homepage`}
            >
              {siteTitle}
            </Link>
          </h2>
        </div>

        {/* Mobile menu button - Right aligned */}
        <div className="flex items-center">
          <StandardNavigation
            SiteDescription={props.SiteDescription}
            sections={props.sections}
            navbar={navbar}
            setNavbar={setNavbar}
            mobileButtonOnly={true}
          />
        </div>

        {/* Desktop menu items */}
        <div className="hidden md:block">
          <StandardNavigation
            SiteDescription={props.SiteDescription}
            sections={props.sections}
            navbar={navbar}
            setNavbar={setNavbar}
            menuItemsOnly={true}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
export type { NavigationSection };
