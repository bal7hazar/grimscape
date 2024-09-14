import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { setup, SetupResult } from "./dojo/setup.ts";
import { DojoProvider } from "./dojo/context.tsx";
import { dojoConfig } from "../dojo.config.ts";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

function Main() {
  const [setupResult, setSetupResult] = useState<SetupResult | null>(null);
  const [ready, setReady] = useState(false);
  const [enter, setEnter] = useState(false);

  const loading = useMemo(
    () => !enter || !setupResult || !ready,
    [enter, setupResult, ready],
  );

  useEffect(() => {
    async function initialize() {
      const result = await setup(dojoConfig());
      setSetupResult(result);
    }

    initialize();
  }, [enter]);

  useEffect(() => {
    if (!enter) return;
    setTimeout(() => setReady(true), 2000);
  }, [enter]);

  if (!setupResult) return null;

  return (
    <React.StrictMode>
      <DojoProvider value={setupResult}>
        <App />
      </DojoProvider>
    </React.StrictMode>
  );
}
root.render(<Main />);
