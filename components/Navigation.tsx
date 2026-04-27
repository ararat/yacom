import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
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
  const [menuOpen, setMenuOpen] = useState(false);

  const siteTitle =
    props.variant === "standard" ? props.SiteTitle : props.siteTitle;

  const handleSiteTitleClick = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const enabledSections = props.variant === "standard"
    ? (props.sections || []).filter(s => s?.enabled)
    : [];

  const blogPostStructuredData =
    props.variant === "blogPost"
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://yuvalararat.com" },
            { "@type": "ListItem", position: 2, name: "Thoughts", item: "https://yuvalararat.com/#blog" },
            { "@type": "ListItem", position: 3, name: props.postTitle, item: typeof window !== "undefined" ? window.location.href : "" },
          ],
        }
      : null;

  if (props.variant === "blogPost") {
    return (
      <>
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostStructuredData) }}
          />
        </Head>
        <nav
          className="fixed top-0 left-0 right-0 bg-obs-base/95 backdrop-blur-sm text-obs-text py-4 z-50 border-b border-obs-border"
          role="navigation"
          aria-label="Blog post navigation"
        >
          <div className="mx-auto px-4 sm:px-6 w-full max-w-[1920px] flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold flex-shrink-0">
              <Link
                href="/"
                className="hover:text-violet-bright transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet-mid rounded-md px-2 py-1 -mx-2 -my-1"
                onClick={handleSiteTitleClick}
                aria-label={`${siteTitle} - Return to homepage`}
              >
                {siteTitle}
              </Link>
            </h1>
            <BlogPostNavigation postTitle={props.postTitle} />
          </div>
        </nav>
      </>
    );
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 bg-obs-base/95 backdrop-blur-sm text-obs-text z-50 border-b border-obs-border"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Top bar */}
      <div className="mx-auto px-4 sm:px-6 w-full max-w-[1920px] flex items-center justify-between py-2 md:py-3">
        {/* Site title */}
        <h2 className="text-xl sm:text-2xl font-bold">
          <Link
            href="/"
            className="text-white hover:text-violet-bright transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet-mid rounded-md px-2 py-1 -mx-2 -my-1 block"
            onClick={handleSiteTitleClick}
            aria-label={`${siteTitle} - Return to homepage`}
          >
            {siteTitle}
          </Link>
        </h2>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center space-x-1" role="menubar">
          {enabledSections.map(section => (
            <li key={section.id} role="none">
              <Link
                href={`/#${section.id}`}
                className="block py-2 px-3 rounded-md text-obs-text hover:bg-obs-raised hover:text-violet-bright focus:outline-none focus:ring-2 focus:ring-violet-mid transition-all duration-200"
                role="menuitem"
              >
                {section.navTitle}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger — always visible on small screens, always right-aligned */}
        <button
          className="md:hidden p-2 rounded-md text-white hover:bg-obs-raised focus:outline-none focus:ring-2 focus:ring-violet-mid transition-colors duration-200"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-obs-surface border-t border-obs-border px-4 pb-4">
          <ul className="flex flex-col space-y-1 pt-2" role="menu">
            {enabledSections.map(section => (
              <li key={section.id} role="none">
                <Link
                  href={`/#${section.id}`}
                  className="block py-2 px-3 rounded-md text-obs-text hover:bg-obs-raised hover:text-violet-bright focus:outline-none focus:ring-2 focus:ring-violet-mid transition-all duration-200"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  {section.navTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
export type { NavigationSection };
