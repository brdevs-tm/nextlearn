"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function CenterCard({ center }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 w-full"
      whileHover={{
        scale: 1.05,
        boxShadow: "0 15px 30px rgba(99, 102, 241, 0.3)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      role="article"
      aria-label={`${center.name} o‘quv markazi`}
    >
      <div className="relative h-48 sm:h-56 md:h-64">
        <Image
          src={center.img}
          alt={`${center.name} surati`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <motion.button
          onClick={() => {
            setIsBookmarked(!isBookmarked);
            if (typeof window !== "undefined" && window.gtag) {
              window.gtag("event", "bookmark", { center_id: center.id });
            }
          }}
          className="absolute top-2 right-2 p-2 rounded-full bg-gray-100 dark:bg-gray-700"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          aria-label={
            isBookmarked ? "Sevimlilardan o‘chirish" : "Sevimlilarga qo‘shish"
          }
        >
          <svg
            className={`w-5 h-5 ${
              isBookmarked ? "text-red-500" : "text-gray-600 dark:text-gray-300"
            }`}
            fill={isBookmarked ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </motion.button>
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2 truncate">
          {center.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2 flex items-center text-sm sm:text-base">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-indigo-600 dark:text-indigo-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
          </svg>
          {center.location}
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm sm:text-base truncate">
          Kurslar: {center.courses.join(", ")}
        </p>
        <div className="flex items-center mb-4">
          <span className="text-yellow-400 text-sm sm:text-base">★</span>
          <span className="ml-1 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            {center.rating}
          </span>
          <span className="ml-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            (${center.price})
          </span>
        </div>
        <Link href={`/centers/${center.id}`}>
          <motion.button
            className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`${center.name} haqida batafsil ma'lumot`}
          >
            Batafsil
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
