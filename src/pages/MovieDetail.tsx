import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, BookOpen, Users, Calendar, Hash, ChevronRight } from "lucide-react";
import { movies } from "@/data/movieData";
import { movieArticles } from "@/data/articleData";
import type { ScientificArticle } from "@/data/articleData";
import { useState, useMemo, useEffect } from "react";

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
const borderColorMap: Record<string, string> = {
  "cinema-blue": "border-cinema-blue/30",
  "cinema-purple": "border-cinema-purple/30",
  "cinema-red": "border-cinema-red/30",
  "cinema-green": "border-cinema-green/30",
  "cinema-teal": "border-cinema-teal/30",
};

const ArticleCard = ({ article, index }: { article: ScientificArticle; index: number }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className={`bg-card border rounded-xl overflow-hidden transition-all duration-300 cursor-pointer hover:border-gold/30 ${
        borderColorMap[article.areaColor] || "border-border"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-5">
        {/* Area badge */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${areaColorMap[article.areaColor]}`} />
            <span className={`text-xs font-medium ${textColorMap[article.areaColor]}`}>
              {article.area}
            </span>
          </div>
          <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${expanded ? "rotate-90" : ""}`} />
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-foreground text-sm leading-snug mb-2">
          {article.title}
        </h3>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {article.authors}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {article.journal}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {article.year}
          </span>
        </div>

        {/* Citations badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/10 text-gold text-xs font-display font-bold">
            <Hash className="w-3 h-3" />
            {article.citations} citas
          </span>
          {article.doi && (
            <a
              href={`https://doi.org/${article.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-xs hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              DOI
            </a>
          )}
        </div>

        {/* Expanded content */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 pt-4 border-t border-border"
          >
            <p className="text-sm text-secondary-foreground leading-relaxed mb-3">
              {article.abstract}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-[10px] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const MovieDetail = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const movie = movies.find((m) => m.id === movieId);
  const articles = movieId ? movieArticles[movieId] || [] : [];


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movieId]);

  const [filterArea, setFilterArea] = useState<string | null>(null);

  const filteredArticles = useMemo(() => {
    if (!filterArea) return articles;
    return articles.filter((a) => a.area === filterArea);
  }, [articles, filterArea]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🎬</p>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">Película no encontrada</h1>
          <Link to="/" className="text-gold hover:underline text-sm">← Volver al ranking</Link>
        </div>
      </div>
    );
  }

  const maxAreaPapers = Math.max(...movie.knowledgeAreas.map((a) => a.papers));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Ranking</span>
          </Link>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-xl">{movie.posterEmoji}</span>
            <span className="font-display font-semibold text-foreground">{movie.title}</span>
            <span className="text-muted-foreground text-sm">({movie.year})</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Movie hero */}
        <motion.section
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start gap-5 mb-6">
            <span className="text-6xl md:text-7xl">{movie.posterEmoji}</span>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-1">
                {movie.title}
              </h1>
              <p className="text-muted-foreground text-sm mb-2">
                {movie.year} · {movie.director} · {movie.genre}
              </p>
              <p className="text-secondary-foreground text-sm leading-relaxed max-w-2xl">
                {movie.description}
              </p>
            </div>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <p className="font-display text-2xl font-bold text-gold">{movie.totalPapers}</p>
              <p className="text-muted-foreground text-xs">Artículos totales</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <p className="font-display text-2xl font-bold text-foreground">{movie.knowledgeAreas.length}</p>
              <p className="text-muted-foreground text-xs">Áreas impactadas</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <p className="font-display text-2xl font-bold text-foreground">{articles.length}</p>
              <p className="text-muted-foreground text-xs">Papers destacados</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <p className="font-display text-2xl font-bold text-foreground">
                {articles.reduce((s, a) => s + a.citations, 0).toLocaleString()}
              </p>
              <p className="text-muted-foreground text-xs">Citas totales</p>
            </div>
          </div>

          {/* Key insight */}
          <div className="p-4 rounded-xl bg-gold/5 border border-gold/20">
            <p className="text-sm">
              <span className="text-gold font-display font-semibold">💡 Dato clave: </span>
              <span className="text-foreground">{movie.keyInsight}</span>
            </p>
          </div>
        </motion.section>

        {/* Two columns: Areas + Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Knowledge areas */}
          <motion.section
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="font-display text-lg font-semibold text-foreground mb-1">
              🔬 Áreas de Conocimiento
            </h2>
            <p className="text-muted-foreground text-xs mb-4">
              Haz clic en un área para filtrar los artículos
            </p>

            <div className="space-y-3">
              {movie.knowledgeAreas.map((area, i) => (
                <button
                  key={area.name}
                  onClick={() => setFilterArea(filterArea === area.name ? null : area.name)}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-200 ${
                    filterArea === area.name
                      ? `${borderColorMap[area.color]} bg-card glow-gold`
                      : "border-border bg-card hover:border-gold/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${areaColorMap[area.color]}`} />
                      <span className={`font-medium text-xs ${textColorMap[area.color]}`}>{area.name}</span>
                    </div>
                    <span className="text-foreground font-display font-bold text-xs">{area.papers}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden mb-1.5">
                    <motion.div
                      className={`h-full rounded-full ${areaColorMap[area.color]} opacity-80`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(area.papers / maxAreaPapers) * 100}%` }}
                      transition={{ duration: 0.6, delay: i * 0.08 }}
                    />
                  </div>
                  <p className="text-muted-foreground text-[10px] leading-snug">{area.description}</p>
                </button>
              ))}
            </div>

            {/* Sources */}
            <div className="mt-6">
              <p className="text-muted-foreground text-xs mb-2 font-medium">Fuentes</p>
              <div className="flex flex-wrap gap-1.5">
                {movie.sources.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded text-[10px] bg-secondary text-muted-foreground">
                    📚 {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Right: Articles list */}
          <motion.section
            className="lg:col-span-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display text-lg font-semibold text-foreground">
                  📄 Artículos Científicos Destacados
                </h2>
                <p className="text-muted-foreground text-xs">
                  {filterArea
                    ? `${filteredArticles.length} artículos en ${filterArea}`
                    : `${articles.length} artículos — clic para ver detalles`}
                </p>
              </div>
              {filterArea && (
                <button
                  onClick={() => setFilterArea(null)}
                  className="text-xs text-gold hover:text-gold/80 transition-colors font-medium"
                >
                  Ver todos ✕
                </button>
              )}
            </div>

            {filteredArticles.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground bg-card border border-border rounded-xl">
                <p className="text-3xl mb-2">📭</p>
                <p className="text-sm">No hay artículos destacados en esta área</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredArticles.map((article, i) => (
                  <ArticleCard key={article.id} article={article} index={i} />
                ))}
              </div>
            )}
          </motion.section>
        </div>

        {/* Back nav */}
        <div className="mt-12 pt-8 border-t border-border flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border text-foreground hover:border-gold/30 transition-all font-display font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al ranking completo
          </Link>
        </div>
      </main>
    </div>
  );
};

export default MovieDetail;
