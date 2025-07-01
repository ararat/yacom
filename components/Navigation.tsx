import {
  DispatchWithoutAction,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Image from "../components/image";
import Link from "next/link";

const Navigation = (props: {
  SiteTitle: string;
  SiteDescription: string;
}): JSX.Element => {
  const [navbar, setNavbar] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-800/95 backdrop-blur-sm text-white py-2 z-50 shadow-lg transition-all duration-300">
      <div className="justify-between px-4 sm:px-6 mx-auto lg:max-w-7xl md:items-center md:flex">
        <div>
          <div className="flex items-center justify-between py-2 md:py-3 md:block">
            <h2 className="text-xl sm:text-2xl text-white font-bold hover:text-blue-300 transition-colors duration-200">
              <Link href="/" className="block">{props.SiteTitle}</Link>
            </h2>

            <div className="md:hidden">
              <button
                id="Navigation"
                value="Navigation"
                className="p-2 text-white rounded-md outline-none focus:ring-2 focus:ring-blue-300 hover:bg-slate-700 transition-colors duration-200"
                onClick={() => setNavbar(!navbar)}
                aria-label={navbar ? "Close menu" : "Open menu"}
                aria-expanded={navbar}
              >
                {navbar ? (
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
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-4 md:flex md:space-x-8 md:space-y-0" role="menubar">
              <li className="text-white" role="none">
                <Link 
                  href="/#welcome" 
                  className="block py-2 px-3 rounded-md hover:bg-slate-700 hover:text-blue-300 transition-all duration-200 text-center md:text-left"
                  role="menuitem"
                  onClick={() => setNavbar(false)}
                >
                  Welcome
                </Link>
              </li>
              <li className="text-white" role="none">
                <Link 
                  href="/#about" 
                  className="block py-2 px-3 rounded-md hover:bg-slate-700 hover:text-blue-300 transition-all duration-200 text-center md:text-left"
                  role="menuitem"
                  onClick={() => setNavbar(false)}
                >
                  About
                </Link>
              </li>
              <li className="text-white" role="none">
                <Link 
                  href="/#blog" 
                  className="block py-2 px-3 rounded-md hover:bg-slate-700 hover:text-blue-300 transition-all duration-200 text-center md:text-left"
                  role="menuitem"
                  onClick={() => setNavbar(false)}
                >
                  Thoughts
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
