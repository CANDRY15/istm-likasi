import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useCreateTFC, useUpdateTFC } from "@/hooks/useContent";

interface TFCData {
  id: string;
  title: string;
  author: string;
  department: string;
  year: string;
  supervisor?: string | null;
  abstract?: string | null;
}

interface TFCFormProps {
  onClose: () => void;
  editData?: TFCData | null;
}

const TFCForm = ({ onClose, editData }: TFCFormProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [supervisor, setSupervisor] = useState("");
  const [abstract, setAbstract] = useState("");
  const createTFC = useCreateTFC();
  const updateTFC = useUpdateTFC();

  const isEditing = !!editData;

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setAuthor(editData.author);
      setDepartment(editData.department);
      setYear(editData.year);
      setSupervisor(editData.supervisor || "");
      setAbstract(editData.abstract || "");
    }
  }, [editData]);

  const departments = [
    "Sciences Infirmières",
    "Techniques de Laboratoire",
    "Sage-Femme",
    "Santé Publique",
    "Pharmacie",
    "Kinésithérapie",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !department) return;

    if (isEditing && editData) {
      updateTFC.mutate(
        { id: editData.id, title, author, department, year, supervisor: supervisor || null, abstract: abstract || null },
        { onSuccess: onClose }
      );
    } else {
      createTFC.mutate(
        { title, author, department, year, supervisor: supervisor || undefined, abstract: abstract || undefined },
        { onSuccess: onClose }
      );
    }
  };

  const isPending = isEditing ? updateTFC.isPending : createTFC.isPending;

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg font-semibold text-foreground">
          {isEditing ? "Modifier le TFC" : "Publier un TFC"}
        </h3>
        <Button variant="ghost" size="icon" onClick={onClose}><X className="w-4 h-4" /></Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Titre du TFC *</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre du travail" className="mt-1" required />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Auteur (Étudiant) *</Label>
            <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Nom complet" className="mt-1" required />
          </div>
          <div>
            <Label>Directeur</Label>
            <Input value={supervisor} onChange={(e) => setSupervisor(e.target.value)} placeholder="Prof. / Dr." className="mt-1" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Département *</Label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            >
              <option value="">Sélectionner...</option>
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Année *</Label>
            <Input value={year} onChange={(e) => setYear(e.target.value)} placeholder="2026" className="mt-1" required />
          </div>
        </div>
        <div>
          <Label>Résumé</Label>
          <Textarea value={abstract} onChange={(e) => setAbstract(e.target.value)} placeholder="Résumé du travail..." className="mt-1" rows={3} />
        </div>
        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Enregistrement..." : isEditing ? "Sauvegarder" : "Publier le TFC"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TFCForm;
