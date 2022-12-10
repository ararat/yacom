import { DispatchWithoutAction, SetStateAction, useEffect, useState } from "react";
import Image from '../components/image';

const Navigation = (props: {
  SiteTitle: string,
  SiteDescription: string
}): JSX.Element => {
  const [active, setActive] = useState<boolean>(false);

  const handleClick = () => {
    setActive(!active);
  };
  return (
    <nav className="top-0 sticky bg-slate-800 text-white py-2 z-50">
      <div className="container flex items-center justify-between mx-10">
        <a className="font-bold text-xl lg:text-2xl" href="/">
          {props.SiteTitle}
        </a>

        <div className="md:hidden flex items-center">
          <button onClick={handleClick} className="flex items-center px-3 py-2 border rounded text-gray-500
           border-gray-600 hover:text-gray-800 hover:border-teal-500 appearance-none focus:outline-none">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className={`${active ? '' : 'hidden'
          }   w-full md:block md:w-auto `}>
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 
          md:flex-row md:space-x-8 md:mt-0 md:font-medium md:border-0 md:bg-white dark:bg-gray-800
           md:dark:bg-gray-900 dark:border-gray-700">
            {[
              ['Welcome', '/#welcome'],
              ['About', '/#about'],
              ['Thoughts', '/#blog'],
            ].map(([title, url]) => (
              // eslint-disable-next-line react/jsx-key
              <li className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><a href={url}>{title}</a></li>))}
          </ul>
        </div>
      </div>

    </nav >
  )
}

export default Navigation;