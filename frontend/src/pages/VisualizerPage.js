import React from 'react';
import PathfindingVisualizer from '../PathfindingVisualizer/PathfindingVisualizer';
import './VisualizerPage.css';

const VisualizerPage = () => {
  return (
    <div className="visualizer-page">
      <div className="container">
        {/* Header */}
        <div className="visualizer-header fade-in">
          <h1 className="visualizer-title">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
              <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
              <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
              <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            Dijkstra's Algorithm Visualizer
          </h1>
          <p className="visualizer-subtitle">
            Watch the shortest path algorithm in action with interactive grid visualization
          </p>
        </div>

        {/* Instructions */}
        <div className="instructions-section slide-in-left">
          <div className="instructions-card">
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2"/>
              </svg>
              How to Use
            </h3>
            <div className="instructions-grid">
              <div className="instruction-item">
                <div className="instruction-icon start-node-demo"></div>
                <span>Start Node (Green)</span>
              </div>
              <div className="instruction-item">
                <div className="instruction-icon finish-node-demo"></div>
                <span>Finish Node (Red)</span>
              </div>
              <div className="instruction-item">
                <div className="instruction-icon wall-node-demo"></div>
                <span>Wall (Click & Drag)</span>
              </div>
              <div className="instruction-item">
                <div className="instruction-icon visited-node-demo"></div>
                <span>Visited Nodes</span>
              </div>
              <div className="instruction-item">
                <div className="instruction-icon path-node-demo"></div>
                <span>Shortest Path</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visualizer Component */}
        <div className="visualizer-container slide-in-right">
          <div className="visualizer-card">
            <PathfindingVisualizer />
          </div>
        </div>

        {/* Algorithm Info */}
        <div className="algorithm-details fade-in">
          <h2>Algorithm Details</h2>
          <div className="details-grid">
            <div className="detail-card">
              <div className="detail-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Time Complexity</h3>
              <p className="complexity-value">O((V + E) log V)</p>
              <p className="complexity-description">
                Where V is the number of vertices and E is the number of edges in the graph.
              </p>
            </div>

            <div className="detail-card">
              <div className="detail-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3>Space Complexity</h3>
              <p className="complexity-value">O(V)</p>
              <p className="complexity-description">
                Linear space complexity for storing distances and priority queue.
              </p>
            </div>

            <div className="detail-card">
              <div className="detail-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3>Algorithm Type</h3>
              <p className="complexity-value">Greedy</p>
              <p className="complexity-description">
                Uses a greedy approach with a priority queue to always select the closest unvisited vertex.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="features-section">
          <h2>Visualization Features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              <span>Interactive grid with drag-and-drop wall creation</span>
            </div>
            <div className="feature-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Real-time visualization of algorithm execution</span>
            </div>
            <div className="feature-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              <span>Step-by-step animation showing visited nodes</span>
            </div>
            <div className="feature-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              <span>Highlighted shortest path from start to finish</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizerPage;
