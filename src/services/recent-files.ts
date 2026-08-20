import { LazyStore } from "@tauri-apps/plugin-store";

export interface RecentFile {
  path: string;
  name: string;
  openedAt: string;
}

const STORE_KEY = "recent-files";
const MAX_RECENT = 20;

const store = new LazyStore("app.json", {
  defaults: {
    [STORE_KEY]: [],
  },
});

export async function getRecentFiles(): Promise<RecentFile[]> {
  return (await store.get<RecentFile[]>(STORE_KEY)) ?? [];
}

export async function addRecentFile(path: string, name: string): Promise<void> {
  const files = await getRecentFiles();
  const filtered = files.filter((f) => f.path !== path);
  const updated: RecentFile[] = [
    { path, name, openedAt: new Date().toISOString() },
    ...filtered,
  ].slice(0, MAX_RECENT);
  await store.set(STORE_KEY, updated);
}

export async function removeRecentFile(path: string): Promise<void> {
  const files = await getRecentFiles();
  await store.set(
    STORE_KEY,
    files.filter((f) => f.path !== path),
  );
}

export async function clearRecentFiles(): Promise<void> {
  await store.set(STORE_KEY, []);
}
