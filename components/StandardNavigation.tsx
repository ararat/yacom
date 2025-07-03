import React from "react";
import Link from "next/link";

interface NavigationSection {
  id: string;
  navTitle: string;
  enabled: boolean;
}

interface StandardNavigationProps {
  SiteDescription: string;
  sections?: NavigationSection[];
  navbar: boolean;
  setNavbar: (value: boolean) => void;
  mobileButtonOnly?: boolean;
  menuItemsOnly?: boolean;
}

const StandardNavigation: React.FC<StandardNavigationProps> = (props) => {
  // Return only mobile menu button
  if (props.mobileButtonOnly) {
    return (
      <div className="md:hidden">
        <button
          id="Navigation"
          value="Navigation"
          className="p-2 text-white rounded-md outline-none focus:ring-2 focus:ring-blue-300 hover:bg-slate-700 transition-colors duration-200"
          onClick={() => props.setNavbar(!props.navbar)}
          aria-label={props.navbar ? "Close menu" : "Open menu"}
          aria-expanded={props.navbar}
        >
          {props.navbar ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>
    );
  }

  // Return only menu items
  if (props.menuItemsOnly) {
    return (
      <div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            props.navbar ? "block" : "hidden md:block"
          }`}
        >
          <ul className="items-center justify-center space-y-4 md:flex md:space-x-8 md:space-y-0" role="menubar">
            {(props.sections || [])
              .filter(section => section?.enabled)
              .map(section => (
                <li key={section.id} className="text-white" role="none">
                  <Link 
                    href={`/#${section.id}`}
                    className="block py-2 px-3 rounded-md hover:bg-slate-700 hover:text-blue-300 focus:bg-slate-700 focus:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 text-center md:text-left"
                    role="menuitem"
                    onClick={() => props.setNavbar(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        props.setNavbar(false);
                      }
                    }}
                    tabIndex={0}
                  >
                    {section.navTitle}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }

  // Default: return nothing (shouldn't be reached)
  return null;
};

export default StandardNavigation;