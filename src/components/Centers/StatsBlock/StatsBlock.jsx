import { motion } from "framer-motion";

export default function StatsBlock() {
  const stats = [
    { value: 100, label: "Markazlar", suffix: "+" },
    { value: 800, label: "O‘qituvchilar", suffix: "+" },
    { value: 12000, label: "O‘quvchilar", suffix: "+" },
    { value: 4.9, label: "Reyting", suffix: "" },
  ];

  return (
    <section className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-50 text-center mb-12 tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Bizning yutuqlarimiz
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <motion.h3
                className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: index * 0.2 }}
              >
                {stat.value}
                {stat.suffix}
              </motion.h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
