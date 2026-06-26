import { UploadDropzone } from "@/components/library/UploadDropzone";

export default function LibraryPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Your Library</h1>
      <UploadDropzone />
    </main>
  );
}
