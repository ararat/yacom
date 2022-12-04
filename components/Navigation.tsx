import { DispatchWithoutAction, SetStateAction, useEffect, useState } from "react";

const Navigation = (props: {
  SiteTitle: string,
  SiteDescription: string
}): JSX.Element => {
  return (
    <nav className="top-0 sticky bg-slate-800 text-white py-2">
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        <a className="font-bold text-xl lg:text-2xl" href="/">
          {props.SiteTitle}
        </a>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-teal-500 appearance-none focus:outline-none">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex">
            {[
              ['Welcome', '/#welcome'],
              ['About', '/#about'],
              ['Thoughts', '/#blog'],
            ].map(([title, url]) => (
              // eslint-disable-next-line react/jsx-key
              <li><a className="px-4 hover:bg-gray-400" href={url}>{title}</a></li>))}
          </ul>
        </div>
      </div>

    </nav>
  )
}
export default Navigation;