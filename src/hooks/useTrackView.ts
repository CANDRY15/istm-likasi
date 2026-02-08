import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Tracks a single view per item per browser session.
 * Uses sessionStorage to avoid counting repeated views.
 */
export const useTrackView = (
  table: "tfc" | "article",
  id: string | undefined
) => {
  const tracked = useRef(false);

  useEffect(() => {
    if (!id || tracked.current) return;

    const storageKey = `viewed_${table}_${id}`;
    if (sessionStorage.getItem(storageKey)) return;

    tracked.current = true;
    sessionStorage.setItem(storageKey, "1");

    const fnName = table === "tfc" ? "increment_tfc_views" : "increment_article_views";
    supabase.rpc(fnName, { _id: id }).then(({ error }) => {
      if (error) console.error("View tracking error:", error);
    });
  }, [table, id]);
};
