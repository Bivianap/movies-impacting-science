import { useMemo } from "react";
import { motion } from "framer-motion";
import type { Movie } from "@/data/movieData";

interface GlobalStatsProps {
  movies: Movie[];
}

const GlobalStats = ({ movies }: GlobalStatsProps) => {
  const stats = useMemo(() => {
    const totalPapers = movies.reduce((sum, m) => sum + m.totalPapers, 0);
    
    const areaMap = new Map<string, number>();
    movies.forEach((m) => {
      m.knowledgeAreas.forEach((a) => {
        areaMap.set(a.name, (areaMap.get(a.name) || 0) + a.papers);
      });
    });
    const topAreas = [...areaMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);

    return { totalPapers, totalMovies: movies.length, topAreas };
  }, [movies]);

  return (
    <section className="py-12">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Películas analizadas", value: stats.totalMovies, icon: "🎬" },
          { label: "Artículos científicos", value: stats.totalPapers.toLocaleString(), icon: "📄" },
          { label: "Áreas de conocimiento", value: stats.topAreas.length + "+", icon: "🔬" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-5 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <span className="text-2xl mb-2 block">{stat.icon}</span>
            <p className="font-display text-2xl md:text-3xl font-bold text-gold">{stat.value}</p>
            <p className="text-muted-foreground text-xs mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="bg-card border border-border rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="font-display font-semibold text-foreground mb-4">
          🏆 Top Áreas de Conocimiento (global)
        </h3>
        <div className="space-y-3">
          {stats.topAreas.map(([name, papers], i) => (
            <div key={name} className="flex items-center gap-3">
              <span className="text-muted-foreground text-xs w-4 text-right">{i + 1}</span>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-foreground font-medium">{name}</span>
                  <span className="text-gold text-xs font-display font-bold">{papers}</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gold/70"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(papers / stats.topAreas[0][1]) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default GlobalStats;
