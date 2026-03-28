import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { Movie } from "@/data/movieData";

interface MovieRankCardProps {
  movie: Movie;
  rank: number;
  isSelected: boolean;
  onClick: () => void;
}

const MovieRankCard = ({ movie, rank, isSelected, onClick }: MovieRankCardProps) => {
  const maxPapers = 412; // Star Wars
  const barWidth = (movie.totalPapers / maxPapers) * 100;

  return (
    <motion.button
      onClick={onClick}
      className={`w-full text-left p-4 md:p-5 rounded-xl border transition-all duration-300 group ${
        isSelected
          ? "border-gold/50 bg-gold/5 glow-gold"
          : "border-border hover:border-gold/20 bg-card hover:bg-card/80"
      }`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: rank * 0.06 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-start gap-4">
        {/* Rank */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-lg ${
          rank <= 3 ? "bg-gold/20 text-gold" : "bg-secondary text-muted-foreground"
        }`}>
          {rank}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{movie.posterEmoji}</span>
            <h3 className="font-display font-semibold text-foreground truncate">
              {movie.title}
            </h3>
            <span className="text-muted-foreground text-sm flex-shrink-0">({movie.year})</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-gold transition-colors ml-auto flex-shrink-0" />
          </div>

          <p className="text-xs text-muted-foreground mb-3">{movie.genre}</p>

          {/* Bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-gold-dim to-gold"
                initial={{ width: 0 }}
                animate={{ width: `${barWidth}%` }}
                transition={{ duration: 0.8, delay: rank * 0.06 + 0.3 }}
              />
            </div>
            <span className="text-gold font-display font-bold text-sm flex-shrink-0">
              {movie.totalPapers}
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">artículos científicos</p>
        </div>
      </div>
    </motion.button>
  );
};

export default MovieRankCard;
