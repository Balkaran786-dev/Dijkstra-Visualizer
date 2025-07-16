import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import IntroductionPage from "./pages/IntroductionPage";
import CodeEditorPage from "./pages/CodeEditorPage";
import VisualizerPage from "./pages/VisualizerPage";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<IntroductionPage />} />
          <Route path="/editor" element={<CodeEditorPage />} />
          <Route path="/visualizer" element={<VisualizerPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
