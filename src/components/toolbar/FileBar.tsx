import { ArrowLeft, FolderOpen } from "lucide-react";

import { useAppStore } from "@/stores/app-store";

export function FileBar() {
  const activeName = useAppStore((s) => s.activeName);
  const closeFile = useAppStore((s) => s.closeFile);

  return (
    <div className="flex items-center gap-3 border-b border-neutral-200 bg-white px-4 py-2 dark:border-neutral-700 dark:bg-neutral-800">
      <button
        type="button"
        onClick={closeFile}
        className="rounded-md p-1.5 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-neutral-700 dark:hover:text-neutral-100"
        title="Back to home"
      >
        <ArrowLeft size={18} />
      </button>
      <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
        <FolderOpen size={16} />
        <span className="truncate max-w-75">{activeName}</span>
      </div>
    </div>
  );
}
