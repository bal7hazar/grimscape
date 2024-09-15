import { useRef } from "react";

import { PhaserGame } from "@/phaser/PhaserGame";
import { useActions } from "./hooks/useActions";
import { Header } from "./ui/containers/Header";
import { ThemeProvider } from "./ui/elements/theme-provider";
import { Overlay } from "./ui/containers/Overlay";

function App() {
  const phaserRef = useRef(null);
  useActions();

  return (
    <div id="app" className="flex flex-col items-center">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Overlay />
        <PhaserGame ref={phaserRef} currentActiveScene={undefined} />
      </ThemeProvider>
    </div>
  );
}

export default App;
