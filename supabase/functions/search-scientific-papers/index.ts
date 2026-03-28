const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { movieTitle } = await req.json();

    if (!movieTitle || typeof movieTitle !== 'string') {
      return new Response(
        JSON.stringify({ success: false, error: 'movieTitle is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      console.error('FIRECRAWL_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const sanitizedTitle = movieTitle.trim().slice(0, 200);
    const query = `"${sanitizedTitle}" scientific papers academic research site:scholar.google.com OR site:pubmed.ncbi.nlm.nih.gov OR site:semanticscholar.org`;

    console.log('Searching scientific papers for:', sanitizedTitle);

    const response = await fetch('https://api.firecrawl.dev/v1/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        limit: 10,
        lang: 'en',
        scrapeOptions: {
          formats: ['markdown'],
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Firecrawl API error:', data);
      return new Response(
        JSON.stringify({ success: false, error: data.error || `Request failed with status ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse search results into structured paper data
    const papers = (data.data || []).map((result: any, index: number) => ({
      id: `search-${index}`,
      title: result.title || 'Untitled',
      url: result.url || '',
      description: result.description || '',
      source: extractSource(result.url || ''),
      snippet: result.markdown?.slice(0, 500) || result.description || '',
    }));

    console.log(`Found ${papers.length} results for "${sanitizedTitle}"`);

    return new Response(
      JSON.stringify({ success: true, papers, movieTitle: sanitizedTitle }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error searching papers:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to search';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function extractSource(url: string): string {
  if (url.includes('scholar.google')) return 'Google Scholar';
  if (url.includes('pubmed')) return 'PubMed';
  if (url.includes('semanticscholar')) return 'Semantic Scholar';
  if (url.includes('scopus')) return 'Scopus';
  if (url.includes('arxiv')) return 'arXiv';
  if (url.includes('ieee')) return 'IEEE';
  if (url.includes('nature.com')) return 'Nature';
  if (url.includes('science.org')) return 'Science';
  if (url.includes('springer')) return 'Springer';
  if (url.includes('wiley')) return 'Wiley';
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return 'Web';
  }
}
