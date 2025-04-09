import Link from "next/link";

import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logotip */}
        <div className="text-indigo-600 text-2xl font-bold">
          <Link href="/">Logo</Link>
        </div>

        {/* Menyu linklari */}
        <ul className="hidden md:flex space-x-8 items-center">
          <li>
            <Link
              href="/"
              className="text-gray-800 hover:text-indigo-600 transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-gray-800 hover:text-indigo-600 transition-colors duration-200"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/pricing"
              className="text-gray-800 hover:text-indigo-600 transition-colors duration-200"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-gray-800 hover:text-indigo-600 transition-colors duration-200"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Qidiruv inputi va tugma */}
        <div className="flex items-center space-x-4">
          {/* Qidiruv */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-100 text-gray-700 pl-4 pr-10 py-2 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <svg
              className="w-5 h-5 text-gray-700 absolute right-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Login tugmasi */}
          <Link href="/login">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
