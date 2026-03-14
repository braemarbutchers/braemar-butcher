module.exports = (req, res) => {
  const { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_PUBLISHABLE_KEY } = process.env;

  if (!SUPABASE_URL || (!SUPABASE_ANON_KEY && !SUPABASE_PUBLISHABLE_KEY)) {
    res.status(500).json({
      error: "Supabase environment variables are not configured.",
    });
    return;
  }

  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
  res.status(200).json({
    supabaseUrl: SUPABASE_URL,
    supabaseKey: SUPABASE_ANON_KEY || SUPABASE_PUBLISHABLE_KEY,
  });
};
