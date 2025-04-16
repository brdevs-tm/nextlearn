"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import debounce from "lodash/debounce";
import { Range } from "react-range";
import "./FilterBar.css";

export default function FilterBar({
  filters,
  setFilters,
  setIsMapView,
  isMapView,
}) {
  const [isSticky, setIsSticky] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [courseTypes, setCourseTypes] = useState(filters.courseType || []);
  const [ratingFilter, setRatingFilter] = useState(filters.rating || 0);
  const [isMobile, setIsMobile] = useState(false);

  // Debounced qidiruv
  const debouncedSearch = useCallback(
    debounce((value) => {
      setFilters((prev) => ({ ...prev, search: value }));
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "search", { search_term: value });
      }
    }, 300),
    []
  );

  // Mobil holatni aniqlash
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll hodisasini boshqarish
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filtrlarni yangilash
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "filter_used", { filter: key, value });
    }
  };

  // Kurs turlari checkboxlarini boshqarish
  const handleCourseTypeChange = (type) => {
    const updatedTypes = courseTypes.includes(type)
      ? courseTypes.filter((t) => t !== type)
      : [...courseTypes, type];
    setCourseTypes(updatedTypes);
    handleFilterChange("courseType", updatedTypes);
  };

  // Geo-lokatsiya funksiyasi
  const handleGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = [position.coords.latitude, position.coords.longitude];
          handleFilterChange("location", coords);
          window.dispatchEvent(
            new CustomEvent("updateMapCenter", { detail: coords })
          );
          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "geolocation_used");
          }
        },
        () => {
          alert("Geolokatsiya ruxsati rad etildi!");
        }
      );
    } else {
      alert("Brauzeringiz geolokatsiyani qo‘llab-quvvatlamaydi!");
    }
  };

  // Filtrlarni tozalash
  const clearFilters = () => {
    setCourseTypes([]);
    setRatingFilter(0);
    setFilters({
      search: "",
      location: "",
      courseType: [],
      sortBy: "rating",
      priceRange: [0, 1000],
      rating: 0,
    });
    setIsFilterOpen(false);
  };

  // Reyting filtri
  const handleRatingChange = (rating) => {
    setRatingFilter(rating);
    handleFilterChange("rating", rating);
  };

  // priceRange xavfsiz murojaat
  const priceRange = Array.isArray(filters.priceRange)
    ? filters.priceRange
    : [0, 1000];

  return (
    <motion.div
      className={`filter-bar bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-4 sm:px-6 transition-all duration-300 ${
        isSticky ? "fixed top-0 left-0 right-0 z-50 shadow-lg animate-glow" : ""
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      role="region"
      aria-label="Filtrlash paneli"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Mobil uchun filter toggle tugmasi */}
        <div className="flex justify-between items-center sm:hidden mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            Filtrlar
          </h2>
          <motion.button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="p-2 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={
              isFilterOpen ? "Filtrlarni yopish" : "Filtrlarni ochish"
            }
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
                  isFilterOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </motion.button>
        </div>

        {/* Filter paneli */}
        <AnimatePresence>
          {(!isFilterOpen && isMobile) || (
            <motion.div
              className="flex flex-col sm:flex-row flex-wrap items-center gap-4"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Qidiruv inputi */}
              <div className="relative flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder="Markaz yoki kurs qidirish..."
                  defaultValue={filters.search}
                  onChange={(e) => debouncedSearch(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 rounded-full py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md"
                  aria-label="O‘quv markazlarni qidirish"
                  tabIndex={0}
                />
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 dark:text-gray-300 animate-pulse"
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

              {/* Lokatsiya dropdown */}
              <div className="relative min-w-[160px]">
                <select
                  value={
                    typeof filters.location === "string" ? filters.location : ""
                  }
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                  className="w-full bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 rounded-full py-3 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 border border-gray-200 dark:border-gray-700 transition-all duration-200 appearance-none"
                  aria-label="Hududni tanlash"
                  tabIndex={0}
                >
                  <option value="">Barcha hududlar</option>
                  <option value="Toshkent">Toshkent</option>
                  <option value="Samarqand">Samarqand</option>
                  <option value="Buxoro">Buxoro</option>
                  <option value="Farg‘ona">Farg‘ona</option>
                  <option value="Andijon">Andijon</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Geo-lokatsiya tugmasi */}
              <motion.button
                onClick={handleGeoLocation}
                className="bg-green-500 dark:bg-green-400 text-white font-semibold py-3 px-4 rounded-full hover:bg-green-600 dark:hover:bg-green-500 transition-all duration-300 flex items-center gap-2 min-w-[120px]"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(16, 185, 129, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                aria-label="Mening joylashuvimni aniqlash"
                tabIndex={0}
              >
                <svg
                  className="w-5 h-5"
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
                <span className="hidden sm:inline">Meni top</span>
              </motion.button>

              {/* Kurs turlari collapsible paneli */}
              <div className="relative min-w-[160px]">
                <motion.button
                  onClick={() => setIsFilterOpen((prev) => !prev)}
                  className="w-full bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 font-semibold py-3 px-4 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Kurs turlarini tanlash"
                  tabIndex={0}
                >
                  Kurs turlari
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={isFilterOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                    />
                  </svg>
                </motion.button>
                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div
                      className="absolute z-50 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {[
                        "IT",
                        "Ingliz tili",
                        "Matematika",
                        "San’at",
                        "Dizayn",
                      ].map((type) => (
                        <label
                          key={type}
                          className="flex items-center gap-2 py-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              handleCourseTypeChange(type);
                            }
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={courseTypes.includes(type)}
                            onChange={() => handleCourseTypeChange(type)}
                            className="hidden"
                          />
                          <span
                            className={`w-5 h-5 flex items-center justify-center rounded border ${
                              courseTypes.includes(type)
                                ? "bg-indigo-600 dark:bg-indigo-500 border-indigo-600 dark:border-indigo-500"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                          >
                            {courseTypes.includes(type) && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </span>
                          <span className="text-gray-600 dark:text-gray-300">
                            {type}
                          </span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Narx diapazoni slider */}
              <div className="min-w-[200px] sm:min-w-[240px]">
                <div className="px-4 py-2">
                  <label
                    className="text-gray-600 dark:text-gray-300 text-sm font-semibold"
                    htmlFor="price-range"
                  >
                    Narx diapazoni: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Range
                    step={10}
                    min={0}
                    max={1000}
                    values={priceRange}
                    onChange={(values) =>
                      handleFilterChange("priceRange", values)
                    }
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        className="h-1 bg-gray-ibb200 dark:bg-gray-700 rounded-full mt-2"
                        style={{ ...props.style }}
                      >
                        <div
                          className="h-1 bg-indigo-600 dark:bg-indigo-500 rounded-full"
                          style={{
                            width: `${
                              ((priceRange[1] - priceRange[0]) / 1000) * 100
                            }%`,
                            marginLeft: `${(priceRange[0] / 1000) * 100}%`,
                          }}
                        />
                        {children}
                      </div>
                    )}
                    renderThumb={({ props, index }) => {
                      const { key, ...restProps } = props; // key ni olib tashlash
                      return (
                        <div
                          {...restProps}
                          className="w-4 h-4 bg-indigo-600 dark:bg-indigo-500 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500"
                          aria-label={`Narx diapazoni ${
                            index === 0 ? "boshlang‘ich" : "oxirgi"
                          } qiymat`}
                        />
                      );
                    }}
                  />
                </div>
              </div>

              {/* Reyting filtri */}
              <div className="min-w-[160px]">
                <div className="flex items-center gap-1 px-4 py-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.svg
                      key={i}
                      className={`w-6 h-6 cursor-pointer ${
                        i < ratingFilter
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      onClick={() => handleRatingChange(i + 1)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`${i + 1} yulduzli reytingni tanlash`}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleRatingChange(i + 1);
                        }
                      }}
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </motion.svg>
                  ))}
                </div>
              </div>

              {/* Tartiblash dropdown */}
              <div className="relative min-w-[160px]">
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 rounded-full py-3 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 border border-gray-200 dark:border-gray-700 transition-all duration-200 appearance-none"
                  aria-label="Tartiblash usulini tanlash"
                  tabIndex={0}
                >
                  <option value="rating">Reyting bo‘yicha</option>
                  <option value="distance">Masofa bo‘yicha</option>
                  <option value="price">Narx bo‘yicha</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Filtrlarni tozalash tugmasi */}
              <motion.button
                onClick={clearFilters}
                className="bg-red-500 dark:bg-red-400 text-white font-semibold py-3 px-4 rounded-full hover:bg-red-600 dark:hover:bg-red-500 transition-all duration-300 flex items-center gap-2 min-w-[120px]"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Barcha filtrlarni tozalash"
                tabIndex={0}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span className="hidden sm:inline">Tozalash</span>
              </motion.button>

              {/* Xarita/Ro‘yxat toggle */}
              <motion.button
                onClick={() => {
                  setIsMapView(!isMapView);
                  if (typeof window !== "undefined" && window.gtag) {
                    window.gtag("event", "view_toggle", {
                      view: isMapView ? "list" : "map",
                    });
                  }
                }}
                className={`flex items-center gap-2 font-semibold py-3 px-4 rounded-full transition-all duration-300 min-w-[120px] ${
                  isMapView
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white"
                    : "bg-gradient-to-r from-green-500 to-teal-500 dark:from-green-400 dark:to-teal-400 text-white"
                }`}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                aria-label={
                  isMapView
                    ? "Ro‘yxat ko‘rinishiga o‘tish"
                    : "Xarita ko‘rinishiga o‘tish"
                }
                tabIndex={0}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isMapView
                        ? "M4 6h16M4 10h16M4 14h16M4 18h16"
                        : "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    }
                  />
                </svg>
                <span className="hidden sm:inline">
                  {isMapView ? "Ro‘yxat" : "Xarita"}
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
