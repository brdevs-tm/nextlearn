"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import FilterBar from "@/components/Centers/FilterBar/FilterBar";
import CenterMap from "@/components/Centers/CenterMap/CenterMap";
import AITips from "@/components/Centers/AITips/AITips";
import StatsBlock from "@/components/Centers/StatsBlock/StatsBlock";
import ReviewsCarousel from "@/components/Centers/ReviewsCarousel/ReviewsCarousel";
import CenterGrid from "@/components/Centers/CenterGrid/CenterGrid";

export default function Centers() {
  const defaultFilters = {
    search: "",
    location: "",
    courseType: [],
    sortBy: "rating",
    priceRange: [0, 1000],
    rating: 0,
  };

  const [filters, setFilters] = useState(() => {
    if (typeof window === "undefined") return defaultFilters;
    try {
      const saved = localStorage.getItem("centerFilters");
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultFilters,
          ...parsed,
          priceRange: Array.isArray(parsed.priceRange)
            ? parsed.priceRange
            : defaultFilters.priceRange,
        };
      }
    } catch (error) {
      console.error("localStorage'dan o‘qishda xato:", error);
    }
    return defaultFilters;
  });
  const [centers, setCenters] = useState([]);
  const [isMapView, setIsMapView] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Dark/light rejim
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    // Filtrlarni saqlash
    localStorage.setItem("centerFilters", JSON.stringify(filters));

    // Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_title: "O‘quv markazlar",
        page_path: "/centers",
      });
    }
  }, [filters]);

  const fetchCenters = async () => {
    setIsLoading(true);
    try {
      // Simulyatsiya: API so‘rovi
      const mockCenters = [
        {
          id: "1",
          name: "Tech Academy",
          location: "Toshkent, Chilanzar",
          courses: ["Python", "Web Dasturlash"],
          rating: 4.8,
          price: 500,
          img: "/images/image.jpg",
          coords: [41.2995, 69.2401],
        },
        {
          id: "2",
          name: "Lingua School",
          location: "Samarqand, Registon",
          courses: ["Ingliz tili", "IELTS"],
          rating: 4.7,
          price: 300,
          img: "/images/image.jpg",
          coords: [39.6542, 66.9757],
        },
        {
          id: "3",
          name: "Math Pro",
          location: "Buxoro, Ark",
          courses: ["Matematika", "Olimpiada"],
          rating: 4.9,
          price: 400,
          img: "/images/image.jpg",
          coords: [39.7747, 64.4286],
        },
      ];

      // Filtrlarni qo‘llash
      const filteredCenters = mockCenters.filter((center) => {
        const matchesSearch = center.name
          .toLowerCase()
          .includes(filters.search.toLowerCase());
        const matchesLocation =
          !filters.location || center.location === filters.location;
        const matchesCourseType =
          filters.courseType.length === 0 ||
          filters.courseType.some((type) => center.courses.includes(type));
        const matchesPrice =
          center.price >= (filters.priceRange[0] ?? 0) &&
          center.price <= (filters.priceRange[1] ?? 1000);
        const matchesRating = center.rating >= filters.rating;
        return (
          matchesSearch &&
          matchesLocation &&
          matchesCourseType &&
          matchesPrice &&
          matchesRating
        );
      });

      // Tartiblash
      const sortedCenters = filteredCenters.sort((a, b) => {
        if (filters.sortBy === "rating") return b.rating - a.rating;
        if (filters.sortBy === "price") return a.price - b.price;
        if (filters.sortBy === "distance") {
          return a.coords[0] - b.coords[0]; // Mock masofa
        }
        return 0;
      });

      setCenters(sortedCenters);
    } catch (error) {
      console.error("Markazlarni yuklashda xato:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCenters();
  }, [filters]);

  return (
    <>
      <Head>
        <title>O‘quv markazlar | NextLearn</title>
        <meta
          name="description"
          content="O‘zbekistondagi eng yaxshi o‘quv markazlarni Yandex xaritada toping va filtrlash orqali o‘zingizga mosini tanlang!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
      </Head>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-all duration-300">
        <motion.section
          className="py-12 md:py-16 bg-gradient-to-b from-indigo-600 to-indigo-400 dark:from-indigo-500 dark:to-indigo-300 text-white text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight px-4">
            O‘quv markazlarni kashf qiling
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
            Sizning ehtiyojlaringizga mos eng yaxshi markazni toping!
          </p>
        </motion.section>

        <FilterBar
          filters={filters}
          setFilters={setFilters}
          setIsMapView={setIsMapView}
          isMapView={isMapView}
        />

        {isLoading ? (
          <div className="flex justify-center items-center h-[600px]">
            <motion.div
              className="text-gray-600 dark:text-gray-300"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </motion.div>
          </div>
        ) : (
          <AnimatePresence>
            {isMapView ? (
              <motion.div
                key="map"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <CenterMap centers={centers} />
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <CenterGrid centers={centers} />
              </motion.div>
            )}
          </AnimatePresence>
        )}

        <AITips />
        <StatsBlock />
        <ReviewsCarousel />
      </div>
    </>
  );
}
