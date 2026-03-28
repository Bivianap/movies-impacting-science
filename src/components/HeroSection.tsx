import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        width={1920}
        height={800}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-gold text-sm font-display tracking-wider mb-6">
            🎬 CIENCIA × CINE
          </span>
        </motion.div>

        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          Películas que{" "}
          <span className="text-gold">transformaron</span>
          <br />
          la ciencia
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Ranking de películas según su impacto real en artículos científicos. 
          Descubre qué films han inspirado investigaciones en robótica, genética, 
          filosofía y más.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {["Robótica", "Filosofía", "Genética", "Neurociencia", "Física"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
