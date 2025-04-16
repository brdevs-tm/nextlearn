"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Swiper from "swiper";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Home.css";

// Reusable AnimatedSection component to handle scroll animations
function AnimatedSection({ children, delay = 0 }) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  // Swiper refs
  const centersSwiperRef = useRef(null);
  const centersSwiperContainerRef = useRef(null);
  const testimonialsSwiperRef = useRef(null);
  const testimonialsSwiperContainerRef = useRef(null);

  // Swiper initialization
  useEffect(() => {
    if (centersSwiperContainerRef.current && !centersSwiperRef.current) {
      centersSwiperRef.current = new Swiper(centersSwiperContainerRef.current, {
        modules: [Navigation, Autoplay, Pagination],
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
        navigation: {
          nextEl: ".centers-swiper-button-next",
          prevEl: ".centers-swiper-button-prev",
        },
        pagination: {
          el: ".centers-swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          640: { slidesPerView: 2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        },
      });
    }

    if (
      testimonialsSwiperContainerRef.current &&
      !testimonialsSwiperRef.current
    ) {
      testimonialsSwiperRef.current = new Swiper(
        testimonialsSwiperContainerRef.current,
        {
          modules: [Navigation, Autoplay, Pagination],
          slidesPerView: 1,
          spaceBetween: 24,
          loop: true,
          autoplay: { delay: 6000, disableOnInteraction: false },
          navigation: {
            nextEl: ".testimonials-swiper-button-next",
            prevEl: ".testimonials-swiper-button-prev",
          },
          pagination: {
            el: ".testimonials-swiper-pagination",
            clickable: true,
          },
          breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          },
        }
      );
    }

    // Cleanup on unmount
    return () => {
      if (centersSwiperRef.current) {
        centersSwiperRef.current.destroy(true, true);
        centersSwiperRef.current = null;
      }
      if (testimonialsSwiperRef.current) {
        testimonialsSwiperRef.current.destroy(true, true);
        testimonialsSwiperRef.current = null;
      }
    };
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[700px] flex items-center justify-center"
        style={{ backgroundImage: "url('/images/image.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-indigo-600/30 dark:to-indigo-500/30"></div>
        <motion.div
          className="relative z-10 text-center text-white px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-50 to-indigo-200 dark:from-gray-50 dark:to-indigo-500"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Kelajak bilim bilan boshlanadi!
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Hududingizdagi ishonchli o‘quv markazlarni toping va hozirdanoq
            o‘qishni boshlang.
          </motion.p>
          <motion.div
            className="flex justify-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/centers">
              <motion.button
                className="bg-indigo-600 dark:bg-indigo-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 20px rgba(99, 102, 241, 0.7)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                O‘quv markazlarni ko‘rish
              </motion.button>
            </Link>
            <Link href="/centers/nearby">
              <motion.button
                className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white hover:text-indigo-600 dark:hover:text-indigo-500 transition-all duration-300"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 20px rgba(255, 255, 255, 0.7)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Yaqin atrofdagi markazni topish
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Statistics Block */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-50 text-center mb-12 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Bizning yutuqlarimiz
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h-2m-6 0H9m2-14h.01M12 17h.01",
                value: "100+",
                label: "Total markazlar",
              },
              {
                icon: "M17 20h5v-2a2 2 0 00-2-2h-3m-2 4h-5a2 2 0 01-2-2v-2m7-10V5a2 2 0 00-2-2H7a2 2 0 00-2 2v3m7 7v3m-7-3h14",
                value: "800+",
                label: "O‘qituvchilar",
              },
              {
                icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
                value: "12,000+",
                label: "O‘quvchilar",
              },
              {
                icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
                value: "4.9",
                label: "O‘rtacha reyting",
              },
            ].map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.2}>
                <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                  <motion.svg
                    className="w-12 h-12 text-indigo-600 dark:text-indigo-500 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ scale: 1.3, rotate: 15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={stat.icon}
                    />
                  </motion.svg>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-50 mb-12 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Qanday ishlaydi?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: "M11 16l-4-4m0 0l4-4m-4 4h14",
                title: "Kirish",
                desc: "Platformaga kiring va imkoniyatlarni kashf qiling.",
              },
              {
                icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553-2.276A1 1 0 0021 13.382V6.618a1 1 0 00-1.553-.894L15 7m0 13l-6-3",
                title: "O‘quv markaz tanlash",
                desc: "Hududingizdagi eng yaxshi markazni tanlang.",
              },
              {
                icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                title: "Kurs tanlash",
                desc: "Sizga mos keluvchi kursni toping.",
              },
              {
                icon: "M5 13l4 4L19 7",
                title: "Ro‘yxatdan o‘tish",
                desc: "Tez va oson ro‘yxatdan o‘ting va o‘qishni boshlang.",
              },
            ].map((step, index) => (
              <AnimatedSection key={step.title} delay={index * 0.2}>
                <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                  <motion.svg
                    className="w-12 h-12 text-indigo-600 dark:text-indigo-500 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ scale: 1.3, rotate: 15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={step.icon}
                    />
                  </motion.svg>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Centers Carousel */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-50 text-center mb-12 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Mashhur o‘quv markazlar
          </motion.h2>
          <div className="relative">
            <div ref={centersSwiperContainerRef} className="swiper">
              <div className="swiper-wrapper">
                {[
                  {
                    name: "English Hub",
                    location: "Toshkent, Chilanzar",
                    courses: 15,
                    img: "/images/image.jpg",
                    link: "/centers/english-hub",
                    rating: 4.8,
                  },
                  {
                    name: "Math Academy",
                    location: "Samarqand, Registon",
                    courses: 10,
                    img: "/images/image.jpg",
                    link: "/centers/math-academy",
                    rating: 4.7,
                  },
                  {
                    name: "CodeMaster",
                    location: "Buxoro, Ark",
                    courses: 8,
                    img: "/images/image.jpg",
                    link: "/centers/codemaster",
                    rating: 4.9,
                  },
                  {
                    name: "Najot Ta'lim",
                    location: "Buxoro, Ark",
                    courses: 8,
                    img: "/images/image.jpg",
                    link: "/centers/codemaster",
                    rating: 4.9,
                  },
                  {
                    name: "PDP Academy",
                    location: "Buxoro, Ark",
                    courses: 8,
                    img: "/images/image.jpg",
                    link: "/centers/codemaster",
                    rating: 4.9,
                  },
                ].map((center) => (
                  <div key={center.name} className="swiper-slide">
                    <motion.div
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 border border-gray-200 dark:border-gray-700"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 15px 30px rgba(99, 102, 241, 0.3)",
                      }}
                    >
                      <div className="relative">
                        <Image
                          src={center.img}
                          alt={center.name}
                          width={400}
                          height={192}
                          className="w-full h-48 object-cover rounded-lg mb-4 transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                        <motion.div
                          className="absolute top-2 right-2 bg-indigo-600 dark:bg-indigo-500 text-white text-xs font-semibold px-2 py-1 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {center.rating} ★
                        </motion.div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">
                        {center.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-1 flex items-center">
                        <svg
                          className="w-4 h-4 mr-1 text-indigo-600 dark:text-indigo-500"
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
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Kurslar soni: {center.courses}
                      </p>
                      <Link href={center.link}>
                        <motion.button
                          className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300"
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Batafsil
                        </motion.button>
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </div>
              <div className="centers-swiper-pagination mt-6 flex justify-center space-x-2"></div>
            </div>
            <motion.div
              className="centers-swiper-button-prev absolute left-0 md:-left-12 top-1/2 transform -translate-y-1/2 bg-indigo-600 dark:bg-indigo-500 text-white p-3 rounded-full cursor-pointer z-10"
              whileHover={{ scale: 1.2, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.div>
            <motion.div
              className="centers-swiper-button-next absolute right-0 md:-right-12 top-1/2 transform -translate-y-1/2 bg-indigo-600 dark:bg-indigo-500 text-white p-3 rounded-full cursor-pointer z-10"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recommended Courses */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-50 text-center mb-12 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Tavsiya etilgan kurslar
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ingliz tili B2",
                duration: "6 oy",
                audience: "Xalqaro imtihonlarga tayyorlanish",
                link: "/courses/english-b2",
                img: "/images/image.jpg",
              },
              {
                name: "Python dasturlash",
                duration: "4 oy",
                audience: "Dasturchilar uchun",
                link: "/courses/python",
                img: "/images/image.jpg",
              },
              {
                name: "Matematika olimpiada",
                duration: "3 oy",
                audience: "Talabalar uchun",
                link: "/courses/math-olympiad",
                img: "/images/image.jpg",
              },
            ].map((course, index) => (
              <AnimatedSection key={course.name} delay={index * 0.2}>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                  <Image
                    src={course.img}
                    alt={course.name}
                    width={400}
                    height={160}
                    className="w-full h-40 object-cover rounded-lg mb-4 transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">
                    {course.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Davomiyligi: {course.duration}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Maqsad: {course.audience}
                  </p>
                  <Link href={course.link}>
                    <motion.button
                      className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Batafsil
                    </motion.button>
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-50 text-center mb-12 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            O‘quvchilar fikri
          </motion.h2>
          <div className="relative">
            <div ref={testimonialsSwiperContainerRef} className="swiper">
              <div className="swiper-wrapper">
                {[
                  {
                    quote:
                      "NextLearn orqali ingliz tili kursini topdim va 6 oyda B2 darajasiga yetdim!",
                    name: "Aliya, Toshkent",
                    course: "Ingliz tili B2",
                    img: "/images/image.jpg",
                  },
                  {
                    quote:
                      "Platforma juda qulay, o‘quv markazni osongina topdim va kurslar haqida to‘liq ma’lumot oldim.",
                    name: "Jamshid, Samarqand",
                    course: "Python dasturlash",
                    img: "/images/image.jpg",
                  },
                  {
                    quote:
                      "Matematika kursi menga olimpiadada yutishimga yordam berdi. Rahmat, NextLearn!",
                    name: "Nodira, Buxoro",
                    course: "Matematika olimpiada",
                    img: "/images/image.jpg",
                  },
                ].map((testimonial) => (
                  <div key={testimonial.name} className="swiper-slide">
                    <motion.div
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 15px 30px rgba(99, 102, 241, 0.3)",
                      }}
                    >
                      <Image
                        src={testimonial.img}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-indigo-600 dark:border-indigo-500"
                        loading="lazy"
                      />
                      <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                        “{testimonial.quote}”
                      </p>
                      <h4 className="text-gray-900 dark:text-gray-50 font-semibold">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {testimonial.course}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>
              <div className="testimonials-swiper-pagination mt-6 flex justify-center space-x-2"></div>
            </div>
            <motion.div
              className="testimonials-swiper-button-prev absolute left-0 md:-left-12 top-1/2 transform -translate-y-1/2 bg-indigo-600 dark:bg-indigo-500 text-white p-3 rounded-full cursor-pointer z-10"
              whileHover={{ scale: 1.2, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.div>
            <motion.div
              className="testimonials-swiper-button-next absolute right-0 md:-right-12 top-1/2 transform -translate-y-1/2 bg-indigo-600 dark:bg-indigo-500 text-white p-3 rounded-full cursor-pointer z-10"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why NextLearn */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-50 text-center mb-12 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Nega NextLearn?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
                title: "Markaziy platforma",
                desc: "Barcha o‘quv markazlar bir joyda, qulay va tartibli.",
              },
              {
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Tasdiqlangan markazlar",
                desc: "Faqat ishonchli va sifatli markazlar bilan hamkorlik.",
              },
              {
                icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
                title: "Geo-lokatsiya qidiruvi",
                desc: "Sizga eng yaqin markazlarni osongina toping.",
              },
            ].map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.2}>
                <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                  <motion.svg
                    className="w-12 h-12 text-indigo-600 dark:text-indigo-500 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ scale: 1.3, rotate: 15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={feature.icon}
                    />
                  </motion.svg>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    {feature.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Recent News */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-50 text-center mb-12 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            So‘nggi yangiliklar
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Yangi ingliz tili kurslari ochildi",
                excerpt:
                  "Toshkentdagi eng yaxshi markazlar yangi B2 va IELTS kurslarini boshladi...",
                date: "12 Apr, 2025",
                img: "/images/image.jpg",
                link: "/blog/english-courses",
              },
              {
                title: "IT sohasida yangi imkoniyatlar",
                excerpt:
                  "Python va Java kurslari Samarqandda kengaymoqda, chunki buning ancha kishi harakat qilmoqda...",
                date: "10 Apr, 2025",
                img: "/images/image.jpg",
                link: "/blog/it-courses",
              },
              {
                title: "Matematika olimpiada muvaffaqiyatlari",
                excerpt:
                  "NextLearn o‘quvchilari xalqaro olimpiadalarda g‘olib bo‘ldi...",
                date: "8 Apr, 2025",
                img: "/images/image.jpg",
                link: "/blog/math-olympiad",
              },
            ].map((news, index) => (
              <AnimatedSection key={news.title} delay={index * 0.2}>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Image
                    src={news.img}
                    alt={news.title}
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {news.excerpt}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {news.date}
                    </p>
                    <Link href={news.link}>
                      <motion.button
                        className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Batafsil
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/blog">
              <motion.button
                className="bg-transparent border-2 border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-500 font-semibold py-3 px-8 rounded-full hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white transition-all duration-300"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Barcha yangiliklar
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Collaboration CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white text-center">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Markazingizni NextLearn tizimiga qo‘shing!
          </motion.h2>
          <motion.p
            className="text-lg mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Platformamiz orqali o‘quv markazingizni kengroq auditoriyaga
            yetkazing va jarayonlarni avtomatlashtiring.
          </motion.p>
          <Link href="/partner">
            <motion.button
              className="bg-white text-indigo-600 dark:text-indigo-500 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-200 transition-all duration-300"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.7)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Hamkorlik uchun murojaat qiling
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}
