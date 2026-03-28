import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, Loader2, BookOpen, Globe } from "lucide-react";
import { searchScientificPapers, type SearchPaper } from "@/lib/api/searchPapers";
import { useToast } from "@/components/ui/use-toast";

const SearchMoviePapers = () => {
  const [query, setQuery] = useState("");
  const [papers, setPapers] = useState<SearchPaper[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchedTitle, setSearchedTitle] = useState("");
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setHasSearched(true);
    setPapers([]);

    try {
      const result = await searchScientificPapers(query.trim());
      if (result.success) {
        setPapers(result.papers);
        setSearchedTitle(result.movieTitle);
      } else {
        toast({
          title: "Error en la búsqueda",
          description: result.error || "No se pudo completar la búsqueda",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudo conectar con el servicio de búsqueda",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-10">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
        🔍 Buscar artículos científicos
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        Escribe el nombre de cualquier película y encontraremos artículos académicos relacionados
      </p>

      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej: Inception, Blade Runner, WALL-E..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="px-6 py-3 rounded-xl bg-gold text-background font-display font-semibold text-sm hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
          Buscar
        </button>
      </form>

      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center py-12 text-muted-foreground"
          >
            <Loader2 className="w-8 h-8 animate-spin mb-3 text-gold" />
            <p className="text-sm">Buscando artículos científicos sobre "{query}"...</p>
          </motion.div>
        )}

        {!isLoading && hasSearched && papers.length === 0 && (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-12 bg-card border border-border rounded-xl"
          >
            <p className="text-3xl mb-2">📭</p>
            <p className="text-muted-foreground text-sm">
              No se encontraron artículos para "{searchedTitle}"
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              Intenta con otro título o una variación del nombre
            </p>
          </motion.div>
        )}

        {!isLoading && papers.length > 0 && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-muted-foreground text-xs mb-4">
              {papers.length} resultados para "{searchedTitle}"
            </p>
            <div className="space-y-3">
              {papers.map((paper, i) => (
                <motion.a
                  key={paper.id}
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-card border border-border rounded-xl hover:border-gold/30 transition-all group"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-foreground text-sm leading-snug mb-1.5 group-hover:text-gold transition-colors">
                        {paper.title}
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mb-2">
                        {paper.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <BookOpen className="w-3 h-3" />
                          {paper.source}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Globe className="w-3 h-3" />
                          <span className="truncate max-w-[200px]">{paper.url}</span>
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-gold transition-colors flex-shrink-0 mt-1" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SearchMoviePapers;
