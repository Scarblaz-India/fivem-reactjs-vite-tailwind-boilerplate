import { useState, useEffect } from "react";
import "./App.css";
import Base from "./components/Base";
import { fetchNui, registerNuiListeners, registerEscapeHandler } from "./utils/NuiUtils";

function App() {
  // Use development mode detection (!window.invokeNative means we're in a browser environment)
  const [visible, setVisible] = useState(() => !window.invokeNative);
  const [data, setData] = useState({});

  useEffect(() => {
    // Register NUI message listener
    const nuiCleanup = registerNuiListeners(setVisible, setData);

    // Register escape key handler
    const escCleanup = registerEscapeHandler(setVisible);

    // Clean up listeners when component unmounts
    return () => {
      nuiCleanup();
      escCleanup();
    };
  }, []);

  return <Base visible={visible} data={data} fetchNui={fetchNui} />;
}

export default App;
