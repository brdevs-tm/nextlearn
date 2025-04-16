"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Swiper from "swiper";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ReviewsCarousel() {
  const swiperRef = useRef(null);
  const swiperContainerRef = useRef(null);

  useEffect(() => {
    if (swiperContainerRef.current && !swiperRef.current) {
      swiperRef.current = new Swiper(swiperContainerRef.current, {
        modules: [Navigation, Autoplay, Pagination],
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        navigation: {
          nextEl: ".reviews-swiper-button-next",
          prevEl: ".reviews-swiper-button-prev",
        },
        pagination: {
          el: ".reviews-swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
          1280: { slidesPerView: 4, spaceBetween: 24 },
        },
      });
    }

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
        swiperRef.current = null;
      }
    };
  }, []);

  const reviews = [
    {
      id: "1",
      quote: "Eng yaxshi markazni topdim, rahmat!",
      author: "Aliya Usmonova",
      rating: 5,
    },
    {
      id: "2",
      quote: "Kurslar sifati juda yuqori!",
      author: "Jamshid Karimov",
      rating: 4,
    },
    {
      id: "3",
      quote: "Ro‘yxatdan o‘tish juda oson!",
      author: "Nodira Rahimova",
      rating: 5,
    },
    {
      id: "4",
      quote: "O‘qituvchilar juda professional!",
      author: "Azizbek Xolmatov",
      rating: 4,
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-50 text-center mb-12 tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          O‘quvchilar fikri
        </motion.h2>
        <div className="swiper" ref={swiperContainerRef}>
          <div className="swiper-wrapper">
            {reviews.map((review) => (
              <div key={review.id} className="swiper-slide">
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center border border-gray-200 dark:border-gray-700"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                  }}
                >
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic text-sm sm:text-base">
                    “{review.quote}”
                  </p>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-50">
                    {review.author}
                  </h4>
                  <div className="flex justify-center mt-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="text-yellow-400 text-sm sm:text-base"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                      >
                        ★
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
          <div className="reviews-swiper-button-prev text-gray-600 dark:text-gray-300 cursor-pointer mt-4 sm:mt-6">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <div className="reviews-swiper-button-next text-gray-600 dark:text-gray-300 cursor-pointer mt-4 sm:mt-6">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          <div className="reviews-swiper-pagination mt-4"></div>
        </div>
      </div>
    </section>
  );
}
