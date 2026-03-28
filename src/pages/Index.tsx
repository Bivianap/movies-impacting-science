import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import MovieRankCard from "@/components/MovieRankCard";
import GlobalStats from "@/components/GlobalStats";
import SearchMoviePapers from "@/components/SearchMoviePapers";
import { movies } from "@/data/movieData";

const Index = () => {
  const navigate = useNavigate();

  const sortedMovies = useMemo(() => {
    return [...movies].sort((a, b) => b.totalPapers - a.totalPapers);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      <main className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
        <section className="py-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            🏅 Ranking: Impacto Científico
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Haz clic en cualquier película para explorar sus artículos científicos en detalle
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedMovies.map((movie, i) => (
              <MovieRankCard
                key={movie.id}
                movie={movie}
                rank={i + 1}
                isSelected={false}
                onClick={() => navigate(`/pelicula/${movie.id}`)}
              />
            ))}
          </div>
        </section>

        <SearchMoviePapers />

        <GlobalStats movies={movies} />

        <section className="py-12 border-t border-border">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">📊 Metodología</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Los datos provienen de investigaciones publicadas en <strong className="text-foreground">Scientometrics</strong> (Nazarovets & Teixeira da Silva, 2024),
              análisis de la <strong className="text-foreground">British Library</strong> vía Sparrho, búsquedas en <strong className="text-foreground">Scopus</strong>,
              <strong className="text-foreground"> Google Scholar</strong>, <strong className="text-foreground">PubMed</strong> y <strong className="text-foreground">Web of Science</strong>.
              Las cifras son estimaciones basadas en la literatura disponible.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-6">
        <p className="text-center text-muted-foreground text-xs">
          CineScience · Cuando la ficción inspira la ciencia
        </p>
      </footer>
    </div>
  );
};

export default Index;
