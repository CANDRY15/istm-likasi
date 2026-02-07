import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useCreateArticle } from "@/hooks/useContent";

interface ArticleFormProps {
  onClose: () => void;
}

const ArticleForm = ({ onClose }: ArticleFormProps) => {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [volume, setVolume] = useState("");
  const [date, setDate] = useState("");
  const [abstract, setAbstract] = useState("");
  const [doi, setDoi] = useState("");
  const createArticle = useCreateArticle();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !authors.trim() || !date.trim()) return;
    createArticle.mutate(
      { title, authors, volume: volume || undefined, date, abstract: abstract || undefined, doi: doi || undefined },
      { onSuccess: onClose }
    );
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg font-semibold text-foreground">Publier un article</h3>
        <Button variant="ghost" size="icon" onClick={onClose}><X className="w-4 h-4" /></Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Titre de l'article *</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre de l'article" className="mt-1" required />
        </div>
        <div>
          <Label>Auteurs *</Label>
          <Input value={authors} onChange={(e) => setAuthors(e.target.value)} placeholder="Prof. X, Dr. Y" className="mt-1" required />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label>Volume</Label>
            <Input value={volume} onChange={(e) => setVolume(e.target.value)} placeholder="Vol. 5, No. 2" className="mt-1" />
          </div>
          <div>
            <Label>Date *</Label>
            <Input value={date} onChange={(e) => setDate(e.target.value)} placeholder="Juin 2026" className="mt-1" required />
          </div>
          <div>
            <Label>DOI</Label>
            <Input value={doi} onChange={(e) => setDoi(e.target.value)} placeholder="10.xxxx/..." className="mt-1" />
          </div>
        </div>
        <div>
          <Label>Résumé</Label>
          <Textarea value={abstract} onChange={(e) => setAbstract(e.target.value)} placeholder="Résumé de l'article..." className="mt-1" rows={3} />
        </div>
        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
          <Button type="submit" disabled={createArticle.isPending}>
            {createArticle.isPending ? "Publication..." : "Publier l'article"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;
