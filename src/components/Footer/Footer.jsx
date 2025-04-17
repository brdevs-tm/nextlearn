"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import "./Footer.css";

export default function Footer() {
  // Animatsiya variantlari
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.footer
      className="bg-gray-900 dark:bg-gray-950 text-gray-200 py-10 sm:py-12 px-4 sm:px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brend haqida */}
        <motion.div
          className="space-y-4"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <h2 className="text-indigo-400 dark:text-indigo-500 text-xl sm:text-2xl font-bold tracking-wide">
            <Link href="/">Logo</Link>
          </h2>
          <p className="text-gray-400 dark:text-gray-300 text-sm sm:text-base leading-relaxed max-w-xs">
            NextLearn — o‘quv markazlarini topish va boshqarish uchun yagona
            platforma. Biz bilan ta’limni soddalashtiring!
          </p>
          <Link href="/partner">
            <motion.button
              className="bg-indigo-600 dark:bg-indigo-500 text-white font-semibold py-1.5 sm:py-2 px-4 sm:px-6 rounded-md text-sm sm:text-base hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Markazingizni qo‘shing
            </motion.button>
          </Link>
        </motion.div>

        {/* Tez linklar */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-50 dark:text-gray-50 mb-3 sm:mb-4">
            Tez linklar
          </h3>
          <ul className="space-y-2 sm:space-y-3">
            {[
              { href: "/centers", label: "O‘quv markazlar" },
              { href: "/courses", label: "Kurslar" },
              { href: "/about", label: "Biz haqimizda" },
              { href: "/blog", label: "Yangiliklar" },
              { href: "/contact", label: "Aloqa" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-gray-400 dark:text-gray-300 hover:text-indigo-400 dark:hover:text-indigo-500 transition-colors duration-200 text-sm sm:text-base relative group"
                >
                  <motion.span
                    className="group-hover:underline underline-offset-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {item.label}
                  </motion.span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Aloqa ma’lumotlari */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-50 dark:text-gray-50 mb-3 sm:mb-4">
            Biz bilan bog‘laning
          </h3>
          <ul className="space-y-2 sm:space-y-3 text-gray-400 dark:text-gray-300 text-sm sm:text-base">
            <li className="flex items-center">
              <svg
                className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-indigo-400 dark:text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              info@nextlearn.uz
            </li>
            <li className="flex items-center">
              <svg
                className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-indigo-400 dark:text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +998 71 123 45 67
            </li>
          </ul>
          {/* Ijtimoiy tarmoqlar */}
          <div className="flex space-x-3 sm:space-x-4 mt-4">
            {[
              {
                href: "https://t.me/nextlearn_uz",
                icon: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.854 9.167l-1.914 9.022c-.142.667-.542.834-.922.39l-2.672-1.964-1.286 1.24c-.142.142-.334.167-.526.167l.192-2.716 4.936-4.465c.216-.192-.048-.3-.334-.108L8.27 13.77l-2.574-.81c-.617-.192-.617-.667.216-.984l10.06-3.878c.5-.192.834.142.834.667z",
              },
              {
                href: "https://instagram.com/nextlearn.uz",
                icon: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.936 3.246.63 4.035c-.297.765-.498 1.635-.558 2.913C.015 8.228 0 8.635 0 11.895v.21c0 3.26.015 3.667.072 4.947.06 1.278.261 2.148.558 2.913.306.789.717 1.459 1.384 2.126s1.337 1.077 2.126 1.384c.765.297 1.635.498 2.913.558 1.28.057 1.687.072 4.947.072s3.667-.015 4.947-.072c1.278-.06 2.148-.261 2.913-.558.789-.306 1.459-.717 2.126-1.384s1.077-1.337 1.384-2.126c.297-.765.498-1.635.558-2.913.057-1.28.072-1.687.072-4.947v-.21c0-3.26-.015-3.667-.072-4.947-.06-1.278-.261-2.148-.558-2.913-.306-.789-.717-1.459-1.384-2.126S20.754.936 19.965.63c-.765-.297-1.635-.498-2.913-.558C15.772.015 15.365 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162S8.597 18.162 12 18.162 18.162 15.403 18.162 12 15.403 5.838 12 5.838zm0 10.123c-2.208 0-4-1.792-4-4s1.792-4 4-4 4 1.792 4 4-1.792 4-4 4zm6.406-11.845c-.796 0-1.441-.645-1.441-1.441s.645-1.441 1.441-1.441 1.441.645 1.441 1.441-.645 1.441-1.441 1.441z",
              },
              {
                href: "https://linkedin.com/in/imhamidovic",
                icon: "M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z",
              },
            ].map((social) => (
              <motion.a
                key={social.href}
                href={social.href}
                className="text-gray-400 dark:text-gray-300 hover:text-indigo-400 dark:hover:text-indigo-500 transition-colors duration-200"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-5 sm:w-6 h-5 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d={social.icon} />
                </svg>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Qo‘shimcha */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-50 dark:text-gray-50 mb-3 sm:mb-4">
            Foydali
          </h3>
          <ul className="space-y-2 sm:space-y-3 text-gray-400 dark:text-gray-300 text-sm sm:text-base">
            {[
              { href: "/faq", label: "Tez-tez so‘raladigan savollar" },
              { href: "/terms", label: "Foydalanish shartlari" },
              { href: "/privacy", label: "Maxfiylik siyosati" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-indigo-400 dark:hover:text-indigo-500 transition-colors duration-200"
                >
                  <motion.span
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {item.label}
                  </motion.span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <motion.div
        className="container mx-auto mt-8 sm:mt-12 border-t border-gray-700 dark:border-gray-700 pt-4 sm:pt-6 text-center text-gray-400 dark:text-gray-300 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p>© 2025 NextLearn. Barcha huquqlar himoyalangan.</p>
      </motion.div>
    </motion.footer>
  );
}
