"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./Navbar.css";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("🇺🇿");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const langRef = useRef(null);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Language selection
  const handleLangSelect = (lang) => {
    setSelectedLang(lang);
    setIsLangOpen(false);
  };

  // Mobile menu animation variants
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-3 sm:py-4 px-4 sm:px-6 sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="text-indigo-600 dark:text-indigo-500 text-xl sm:text-2xl font-bold tracking-wide"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link href="/">Logo</Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {[
            { href: "/centers", label: "O‘quv markazlar" },
            { href: "/courses", label: "Kurslar" },
            { href: "/about", label: "Biz haqimizda" },
            { href: "/blog", label: "Yangiliklar" },
            { href: "/contact", label: "Aloqa" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-gray-600 dark:text-gray-300 font-medium group"
            >
              <motion.span
                className="relative z-10 px-3 py-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-500 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {item.label}
              </motion.span>
              <span className="absolute inset-x-0 top-7 h-1 bg-indigo-600 dark:bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
            </Link>
          ))}
        </div>

        {/* User Controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Search Input */}
          <div className="hidden sm:block relative">
            <input
              type="text"
              placeholder="Qidirish..."
              className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 rounded-full py-1.5 sm:py-2 px-3 sm:px-4 pl-8 sm:pl-10 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 transition-all duration-200 w-32 sm:w-40 lg:w-48 border border-gray-200 dark:border-gray-700"
            />
            <svg
              className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-600 dark:text-gray-300"
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

          {/* Language Dropdown */}
          <div className="relative" ref={langRef}>
            <motion.button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-500 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-base sm:text-lg">{selectedLang}</span>
            </motion.button>
            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-md w-28 sm:w-32 py-2 z-50 border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {[
                    { flag: "🇺🇿", label: "Uzbek" },
                    { flag: "🇷🇺", label: "Русский" },
                    { flag: "🇬🇧", label: "English" },
                  ].map((lang) => (
                    <button
                      key={lang.flag}
                      onClick={() => handleLangSelect(lang.flag)}
                      className="block w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900 hover:text-indigo-600 dark:hover:text-indigo-500 transition-colors duration-200"
                    >
                      {lang.flag} {lang.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dark Mode Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-500 transition-colors duration-200"
            whileHover={{ scale: 1.2, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Dark mode toggle"
          >
            {isDarkMode ? (
              <svg
                className="w-5 sm:w-6 h-5 sm:h-6"
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
                className="w-5 sm:w-6 h-5 sm:h-6"
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
          </motion.button>

          {/* Partner Button */}
          <Link href="/partner">
            <motion.button
              className="relative bg-indigo-600 dark:bg-indigo-500 text-white font-semibold py-1.5 sm:py-2 px-4 sm:px-6 rounded-full overflow-hidden group text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Hamkorlik</span>
              <span className="absolute inset-0 bg-indigo-500 dark:bg-indigo-400 opacity-30 animate-glow"></span>
              <span className="absolute top-1/2 left-2 w-2 h-2 bg-white rounded-full opacity-50 animate-bounce-pulse"></span>
              <span className="absolute inset-0 bg-indigo-700 dark:bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></span>
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-500 transition-colors duration-200"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
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
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4 px-4 sm:px-6"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="space-y-3">
              {[
                { href: "/centers", label: "O‘quv markazlar" },
                { href: "/courses", label: "Kurslar" },
                { href: "/about", label: "Biz haqimizda" },
                { href: "/blog", label: "Yangiliklar" },
                { href: "/contact", label: "Aloqa" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-500 transition-colors duration-200 text-base sm:text-lg font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {/* Mobile Search */}
              <div className="relative mt-4">
                <input
                  type="text"
                  placeholder="Qidirish..."
                  className="w-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 rounded-full py-2 px-4 pl-10 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 transition-all duration-200 border border-gray-200 dark:border-gray-700"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 dark:text-gray-300"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
