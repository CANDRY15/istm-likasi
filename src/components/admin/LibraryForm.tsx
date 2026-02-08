import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useCreateLibraryDoc, useUpdateLibraryDoc } from "@/hooks/useContent";

interface LibraryData {
  id: string;
  title: string;
  author: string;
  category: string;
  year: string;
  description?: string | null;
}

interface LibraryFormProps {
  onClose: () => void;
  editData?: LibraryData | null;
}

const LibraryForm = ({ onClose, editData }: LibraryFormProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [description, setDescription] = useState("");
  const createDoc = useCreateLibraryDoc();
  const updateDoc = useUpdateLibraryDoc();

  const isEditing = !!editData;

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setAuthor(editData.author);
      setCategory(editData.category);
      setYear(editData.year);
      setDescription(editData.description || "");
    }
  }, [editData]);

  const categories = [
    "Sciences Médicales",
    "Sciences Infirmières",
    "Pharmacie",
    "Laboratoire",
    "Santé Publique",
    "Kinésithérapie",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !category) return;

    if (isEditing && editData) {
      updateDoc.mutate(
        { id: editData.id, title, author, category, year, description: description || null },
        { onSuccess: onClose }
      );
    } else {
      createDoc.mutate(
        { title, author, category, year, description: description || undefined },
        { onSuccess: onClose }
      );
    }
  };

  const isPending = isEditing ? updateDoc.isPending : createDoc.isPending;

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg font-semibold text-foreground">
          {isEditing ? "Modifier le document" : "Ajouter un document"}
        </h3>
        <Button variant="ghost" size="icon" onClick={onClose}><X className="w-4 h-4" /></Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Titre du document *</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre" className="mt-1" required />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Auteur *</Label>
            <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Prof. / Dr." className="mt-1" required />
          </div>
          <div>
            <Label>Catégorie *</Label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            >
              <option value="">Sélectionner...</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <Label>Année *</Label>
          <Input value={year} onChange={(e) => setYear(e.target.value)} placeholder="2026" className="mt-1" required />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description du document..." className="mt-1" rows={3} />
        </div>
        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Enregistrement..." : isEditing ? "Sauvegarder" : "Ajouter le document"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LibraryForm;
