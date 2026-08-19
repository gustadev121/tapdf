import { useAppStore } from "@/stores/app-store";
import { HomeView } from "@/views/home/HomeView";
import { ViewerView } from "@/views/viewer/ViewerView";

function App() {
  const view = useAppStore((s) => s.view);

  if (view === "viewer") {
    return <ViewerView />;
  }

  return <HomeView />;
}

export default App;
