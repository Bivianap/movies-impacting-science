import { motion } from "framer-motion";

interface FilterBarProps {
  genres: string[];
  knowledgeAreas: string[];
  selectedGenre: string | null;
  selectedArea: string | null;
  onGenreChange: (genre: string | null) => void;
  onAreaChange: (area: string | null) => void;
}

const FilterBar = ({
  genres,
  knowledgeAreas,
  selectedGenre,
  selectedArea,
  onGenreChange,
  onAreaChange,
}: FilterBarProps) => {
  const hasFilters = selectedGenre || selectedArea;

  return (
    <motion.div
      className="bg-card border border-border rounded-xl p-5 mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-sm text-foreground">🔍 Filtros</h3>
        {hasFilters && (
          <button
            onClick={() => { onGenreChange(null); onAreaChange(null); }}
            className="text-xs text-gold hover:text-gold/80 transition-colors font-medium"
          >
            Limpiar filtros ✕
          </button>
        )}
      </div>

      {/* Genre filters */}
      <div className="mb-4">
        <p className="text-muted-foreground text-xs mb-2 font-medium">Género</p>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => onGenreChange(selectedGenre === genre ? null : genre)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                selectedGenre === genre
                  ? "bg-gold text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Knowledge area filters */}
      <div>
        <p className="text-muted-foreground text-xs mb-2 font-medium">Área de Conocimiento</p>
        <div className="flex flex-wrap gap-2">
          {knowledgeAreas.map((area) => (
            <button
              key={area}
              onClick={() => onAreaChange(selectedArea === area ? null : area)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                selectedArea === area
                  ? "bg-cinema-blue text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;
