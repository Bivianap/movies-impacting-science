import { motion, AnimatePresence } from "framer-motion";
import type { Movie } from "@/data/movieData";

interface MovieDetailPanelProps {
  movie: Movie | null;
}

const areaColorMap: Record<string, string> = {
  "cinema-blue": "bg-cinema-blue",
  "cinema-purple": "bg-cinema-purple",
  "cinema-red": "bg-cinema-red",
  "cinema-green": "bg-cinema-green",
  "cinema-teal": "bg-cinema-teal",
};

const textColorMap: Record<string, string> = {
  "cinema-blue": "text-cinema-blue",
  "cinema-purple": "text-cinema-purple",
  "cinema-red": "text-cinema-red",
  "cinema-green": "text-cinema-green",
  "cinema-teal": "text-cinema-teal",
};

const MovieDetailPanel = ({ movie }: MovieDetailPanelProps) => {
  if (!movie) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px] border border-dashed border-border rounded-xl">
        <p className="text-muted-foreground text-center font-body">
          ← Selecciona una película para ver<br />su impacto científico en detalle
        </p>
      </div>
    );
  }

  const maxAreaPapers = Math.max(...movie.knowledgeAreas.map((a) => a.papers));

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={movie.id}
        className="bg-card border border-border rounded-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-border">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-5xl">{movie.posterEmoji}</span>
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                {movie.title}
              </h2>
              <p className="text-muted-foreground text-sm">
                {movie.year} · {movie.director} · {movie.genre}
              </p>
            </div>
          </div>
          <p className="text-secondary-foreground text-sm leading-relaxed">{movie.description}</p>

          {/* Key Insight */}
          <div className="mt-4 p-3 rounded-lg bg-gold/5 border border-gold/20">
            <p className="text-sm">
              <span className="text-gold font-display font-semibold">💡 Dato clave: </span>
              <span className="text-foreground">{movie.keyInsight}</span>
            </p>
          </div>
        </div>

        {/* Knowledge Areas */}
        <div className="p-6 md:p-8">
          <h3 className="font-display font-semibold text-foreground mb-1">
            Áreas de Conocimiento Impactadas
          </h3>
          <p className="text-muted-foreground text-xs mb-5">
            Distribución de {movie.totalPapers} artículos por disciplina científica
          </p>

          <div className="space-y-4">
            {movie.knowledgeAreas.map((area, i) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${areaColorMap[area.color]}`} />
                    <span className={`font-medium text-sm ${textColorMap[area.color]}`}>
                      {area.name}
                    </span>
                  </div>
                  <span className="text-foreground font-display font-bold text-sm">
                    {area.papers}
                  </span>
                </div>

                <div className="h-3 rounded-full bg-secondary overflow-hidden mb-1">
                  <motion.div
                    className={`h-full rounded-full ${areaColorMap[area.color]} opacity-80`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(area.papers / maxAreaPapers) * 100}%` }}
                    transition={{ duration: 0.6, delay: i * 0.08 + 0.2 }}
                  />
                </div>

                <p className="text-muted-foreground text-xs pl-4">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sources */}
        <div className="px-6 md:px-8 pb-6 md:pb-8">
          <div className="flex flex-wrap gap-2">
            {movie.sources.map((source) => (
              <span
                key={source}
                className="px-2 py-0.5 rounded text-[10px] bg-secondary text-muted-foreground font-medium"
              >
                📚 {source}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MovieDetailPanel;
