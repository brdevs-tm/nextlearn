import { motion } from "framer-motion";

export default function AITips() {
  const tips = [
    {
      id: "1",
      name: "Tech Academy",
      desc: "IT kurslari uchun eng yaxshi tanlov!",
      rating: 4.8,
    },
    {
      id: "2",
      name: "Lingua School",
      desc: "Ingliz tilini tez o‘rganing!",
      rating: 4.7,
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white">
      <div className="container mx-auto px-4 max-w-7xl text-center">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          AI Tavsiyalari
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Sizning qiziqishlaringiz asosida tanlangan markazlar!
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {tips.map((tip) => (
            <motion.div
              key={tip.id}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
              }}
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {tip.name}
              </h3>
              <p className="text-sm sm:text-base mb-4">{tip.desc}</p>
              <span className="text-yellow-400 text-sm sm:text-base">
                ★ {tip.rating}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
