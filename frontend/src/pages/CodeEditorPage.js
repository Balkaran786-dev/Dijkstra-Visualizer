import React, { useState } from "react";
import "./CodeEditorPage.css";

const CodeEditorPage = () => {
  const [code, setCode] = useState({
    cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

#define INF INT_MAX

void dijkstra(vector<vector<pair<int, int>>> &graph, int source) {
  int V = graph.size();
  vector<int> dist(V, INF);
  priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
  dist[source] = 0;
  pq.push({0, source});

  while (!pq.empty()) {
    int u = pq.top().second;
    pq.pop();

    for (auto &neighbor : graph[u]) {
      int v = neighbor.first;
      int weight = neighbor.second;

      if (dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
        pq.push({dist[v], v});
      }
    }
  }

  // Print shortest distances from source to all vertices
  cout << "Shortest distances from source " << source << ":" << endl;
  for (int i = 0; i < V; ++i)
    cout << "Vertex " << i << ": " << dist[i] << endl;
}

int main() {
  int V = 5;
  vector<vector<pair<int, int>>> graph(V);

  // Example graph setup
  graph[0].push_back({1, 2});
  graph[0].push_back({2, 4});
  graph[1].push_back({2, 1});
  graph[1].push_back({3, 7});
  graph[2].push_back({3, 3});
  graph[3].push_back({4, 1});

  dijkstra(graph, 0);

  return 0;
}`,
  });

  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");

  const handleCodeChange = (e) => {
    setCode({ ...code, [selectedLanguage]: e.target.value });
  };

  const runCode = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dijkstra-visualizer-10.onrender.com/api/${selectedLanguage}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: code[selectedLanguage] }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result.status === "success") {
        setOutput(result.stdout);
      } else {
        setOutput(result.stderr || result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setOutput("Error executing code. Please check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="code-editor-page">
      <div className="container">
        {/* Header */}
        <div className="editor-header fade-in">
          <h1 className="editor-title">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M9 9h6M9 13h6M9 17h3" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Interactive Code Editor
          </h1>
          <p className="editor-subtitle">
            Write, test, and execute Dijkstra's algorithm in real-time
          </p>
        </div>

        {/* Main Editor Layout */}
        <div className="editor-layout">
          {/* Code Editor Section */}
          <div className="editor-section slide-in-left">
            <div className="editor-card">
              <div className="editor-toolbar">
                <div className="language-selector">
                  <label htmlFor="language">Language:</label>
                  <select
                    id="language"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="language-select"
                  >
                    <option value="cpp">C++</option>
                  </select>
                </div>
                <button
                  onClick={runCode}
                  disabled={loading}
                  className={`run-button ${loading ? 'loading' : ''}`}
                >
                  {loading ? (
                    <>
                      <div className="spinner"></div>
                      Running...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <polygon points="5,3 19,12 5,21" fill="currentColor"/>
                      </svg>
                      Run Code
                    </>
                  )}
                </button>
              </div>

              <div className="code-editor-container">
                <textarea
                  className="code-input"
                  value={code[selectedLanguage]}
                  onChange={handleCodeChange}
                  placeholder="Enter your Dijkstra algorithm code here..."
                  spellCheck="false"
                />
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="output-section slide-in-right">
            <div className="output-card">
              <div className="output-header">
                <h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M8 21l4-7 4 7" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Output
                </h3>
                {output && (
                  <button
                    className="clear-button"
                    onClick={() => setOutput("")}
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="output-content">
                {output ? (
                  <pre className="output-text">{output}</pre>
                ) : (
                  <div className="output-placeholder">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <p>Click "Run Code" to see the output</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Algorithm Info */}
        <div className="algorithm-info fade-in">
          <h2>About This Implementation</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Algorithm Features</h3>
              <ul>
                <li>✅ Priority queue optimization</li>
                <li>✅ Handles weighted graphs</li>
                <li>✅ O((V + E) log V) complexity</li>
                <li>✅ Finds shortest paths from source</li>
              </ul>
            </div>
            <div className="info-card">
              <h3>Code Structure</h3>
              <ul>
                <li>📊 Graph representation using adjacency list</li>
                <li>🔄 Priority queue for efficient vertex selection</li>
                <li>📏 Distance array to track shortest paths</li>
                <li>🎯 Source vertex as starting point</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorPage;
