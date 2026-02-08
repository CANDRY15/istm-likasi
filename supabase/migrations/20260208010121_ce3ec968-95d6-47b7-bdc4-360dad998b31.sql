
-- Function to increment views on tfc_submissions
CREATE OR REPLACE FUNCTION public.increment_tfc_views(_id uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE tfc_submissions SET views = views + 1 WHERE id = _id;
$$;

-- Function to increment views on articles
CREATE OR REPLACE FUNCTION public.increment_article_views(_id uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE articles SET views = views + 1 WHERE id = _id;
$$;
