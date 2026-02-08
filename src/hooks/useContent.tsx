import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// ---- TFC ----
export const useTFCs = () =>
  useQuery({
    queryKey: ["tfcs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tfc_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export const useCreateTFC = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (tfc: {
      title: string;
      author: string;
      department: string;
      year: string;
      supervisor?: string;
      abstract?: string;
    }) => {
      const { data, error } = await supabase.from("tfc_submissions").insert(tfc).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tfcs"] });
      toast({ title: "TFC publié avec succès" });
    },
    onError: (e: Error) => toast({ title: "Erreur", description: e.message, variant: "destructive" }),
  });
};

export const useUpdateTFC = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, ...updates }: {
      id: string;
      title?: string;
      author?: string;
      department?: string;
      year?: string;
      supervisor?: string | null;
      abstract?: string | null;
    }) => {
      const { error } = await supabase.from("tfc_submissions").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tfcs"] });
      toast({ title: "TFC modifié avec succès" });
    },
    onError: (e: Error) => toast({ title: "Erreur", description: e.message, variant: "destructive" }),
  });
};

export const useDeleteTFC = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("tfc_submissions").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tfcs"] });
      toast({ title: "TFC supprimé" });
    },
    onError: (e: Error) => toast({ title: "Erreur", description: e.message, variant: "destructive" }),
  });
};

// ---- Library ----
export const useLibraryDocs = () =>
  useQuery({
    queryKey: ["library_documents"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("library_documents")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export const useCreateLibraryDoc = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (doc: {
      title: string;
      author: string;
      category: string;
      year: string;
      description?: string;
    }) => {
      const { data, error } = await supabase.from("library_documents").insert(doc).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["library_documents"] });
      toast({ title: "Document ajouté avec succès" });
    },
    onError: (e: Error) => toast({ title: "Erreur", description: e.message, variant: "destructive" }),
  });
};

export const useUpdateLibraryDoc = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, ...updates }: {
      id: string;
      title?: string;
      author?: string;
      category?: string;
      year?: string;
      description?: string | null;
    }) => {
      const { error } = await supabase.from("library_documents").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["library_documents"] });
      toast({ title: "Document modifié avec succès" });
    },
    onError: (e: Error) => toast({ title: "Erreur", description: e.message, variant: "destructive" }),
  });
};

export const useDeleteLibraryDoc = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("library_documents").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["library_documents"] });
      toast({ title: "Document supprimé" });
    },
    onError: (e: Error) => toast({ title: "Erreur", description: e.message, variant: "destructive" }),
  });
};

// ---- Articles ----
export const useArticles = () =>
  useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export const useCreateArticle = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (article: {
      title: string;
      authors: string;
      volume?: string;
      date: string;
      abstract?: string;
      doi?: string;
    }) => {
      const { data, error } = await supabase.from("articles").insert(article).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
      toast({ title: "Article publié avec succès" });
    },
    onError: (e: Error) => toast({ title: "Erreur", description: e.message, variant: "destructive" }),
  });
};

export const useUpdateArticle = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, ...updates }: {
      id: string;
      title?: string;
      authors?: string;
      volume?: string | null;
      date?: string;
      abstract?: string | null;
      doi?: string | null;
    }) => {
      const { error } = await supabase.from("articles").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
      toast({ title: "Article modifié avec succès" });
    },
    onError: (e: Error) => toast({ title: "Erreur", description: e.message, variant: "destructive" }),
  });
};

export const useDeleteArticle = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("articles").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
      toast({ title: "Article supprimé" });
    },
    onError: (e: Error) => toast({ title: "Erreur", description: e.message, variant: "destructive" }),
  });
};
