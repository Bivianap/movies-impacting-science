import { supabase } from '@/integrations/supabase/client';

export interface SearchPaper {
  id: string;
  title: string;
  url: string;
  description: string;
  source: string;
  snippet: string;
}

export interface SearchResult {
  success: boolean;
  papers: SearchPaper[];
  movieTitle: string;
  error?: string;
}

export async function searchScientificPapers(movieTitle: string): Promise<SearchResult> {
  const { data, error } = await supabase.functions.invoke('search-scientific-papers', {
    body: { movieTitle },
  });

  if (error) {
    return { success: false, papers: [], movieTitle, error: error.message };
  }

  return data as SearchResult;
}
