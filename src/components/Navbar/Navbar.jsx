"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("🇺🇿"); // Default til
  const [isDarkMode, setIsDarkMode] = useState(false);
  const langRef = useRef(null);

  // Dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Til dropdownni tashqariga bosilganda yopish
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Til tanlash funksiyasi
  const handleLangSelect = (lang) => {
    setSelectedLang(lang);
    setIsLangOpen(false); // Tanlangandan keyin yopiladi
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-4 px-6 sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between">
        {/* 1. Logo + Home */}
        <div className="text-indigo-600 dark:text-indigo-400 text-2xl font-bold tracking-wide hover:scale-105 transition-transform duration-200">
          <Link href="/">Logo</Link>
        </div>

        {/* 2. Navigatsiya menyusi (Desktop) */}
        <div className="hidden md:flex items-center space-x-10">
          {/* O‘quv markazlar */}
          <Link
            href="/centers"
            className="relative text-gray-800 dark:text-gray-200 font-medium group"
          >
            <span className="relative z-10 px-3 py-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
              O‘quv markazlar
            </span>
            <span className="absolute inset-x-0 t top-7 h-1 bg-indigo-600 dark:bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
          </Link>

          {/* Kurslar */}
          <Link
            href="/courses"
            className="relative text-gray-800 dark:text-gray-200 font-medium group"
          >
            <span className="relative z-10 px-3 py-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
              Kurslar
            </span>
            <span className="absolute inset-x-0 top-7 h-1 bg-indigo-600 dark:bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
          </Link>

          {/* Biz haqimizda */}
          <Link
            href="/about"
            className="relative text-gray-800 dark:text-gray-200 font-medium group"
          >
            <span className="relative z-10 px-3 py-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
              Biz haqimizda
            </span>
            <span className="absolute inset-x-0 top-7 h-1 bg-indigo-600 dark:bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
          </Link>

          {/* Yangiliklar */}
          <Link
            href="/blog"
            className="relative text-gray-800 dark:text-gray-200 font-medium group"
          >
            <span className="relative z-10 px-3 py-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
              Yangiliklar
            </span>
            <span className="absolute inset-x-0 top-7 h-1 bg-indigo-600 dark:bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
          </Link>

          {/* Aloqa */}
          <Link
            href="/contact"
            className="relative text-gray-800 dark:text-gray-200 font-medium group"
          >
            <span className="relative z-10 px-3 py-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
              Aloqa
            </span>
            <span className="absolute inset-x-0 top-7 h-1 bg-indigo-600 dark:bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
          </Link>
        </div>

        {/* 3. Foydalanuvchi paneli */}
        <div className="flex items-center space-x-6">
          {/* Search input */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-200"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-700 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Til tanlash */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
            >
              <span className="text-lg">{selectedLang}</span>
            </button>
            {isLangOpen && (
              <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-md w-32 py-2 z-50">
                <button
                  onClick={() => handleLangSelect("🇺🇿")}
                  className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                >
                  🇺🇿 Uzbek
                </button>
                <button
                  onClick={() => handleLangSelect("🇷🇺")}
                  className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                >
                  🇷🇺 Русский
                </button>
                <button
                  onClick={() => handleLangSelect("🇬🇧")}
                  className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                >
                  🇬🇧 English
                </button>
              </div>
            )}
          </div>

          {/* Day/Night toggle */}
          <button
            onClick={toggleDarkMode}
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
          >
            {isDarkMode ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* 4. Mobil menyu (Hamburger) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobil menyu (Collapsible) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4 px-6 space-y-4">
          <Link
            href="/centers"
            className="block text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
          >
            O‘quv markazlar
          </Link>
          <Link
            href="/courses"
            className="block text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
          >
            Kurslar
          </Link>
          <Link
            href="/about"
            className="block text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
          >
            Biz haqimizda
          </Link>
          <Link
            href="/blog"
            className="block text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
          >
            Yangiliklar
          </Link>
          <Link
            href="/contact"
            className="block text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
          >
            Aloqa
          </Link>
        </div>
      )}
    </nav>
  );
}
