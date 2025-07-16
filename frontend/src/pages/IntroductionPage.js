import React from 'react';
import { Link } from 'react-router-dom';
import './IntroductionPage.css';

const IntroductionPage = () => {
  return (
    <div className="introduction-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content fade-in">
            <h1 className="hero-title">
              Dijkstra's Algorithm
              <span className="gradient-text"> Visualizer</span>
            </h1>
            <p className="hero-subtitle">
              Master the shortest path algorithm with interactive visualizations, 
              comprehensive explanations, and hands-on coding experience.
            </p>
            <div className="hero-actions">
              <Link to="/visualizer" className="btn btn-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <polygon points="5,3 19,12 5,21" fill="currentColor"/>
                </svg>
                Start Visualizing
              </Link>
              <Link to="/editor" className="btn btn-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M9 9h6M9 13h6M9 17h3" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Try Code Editor
              </Link>
            </div>
          </div>
          <div className="hero-visual slide-in-right">
            <div className="algorithm-demo">
              <div className="demo-graph">
                <div className="demo-node start-node">A</div>
                <div className="demo-node">B</div>
                <div className="demo-node">C</div>
                <div className="demo-node end-node">D</div>
                <svg className="demo-edges" viewBox="0 0 300 200">
                  <path d="M50 50 L150 50" stroke="var(--primary-color)" strokeWidth="2" className="demo-edge"/>
                  <path d="M50 50 L50 150" stroke="var(--primary-color)" strokeWidth="2" className="demo-edge"/>
                  <path d="M150 50 L250 50" stroke="var(--primary-color)" strokeWidth="2" className="demo-edge"/>
                  <path d="M150 50 L150 150" stroke="var(--primary-color)" strokeWidth="2" className="demo-edge"/>
                  <path d="M50 150 L150 150" stroke="var(--primary-color)" strokeWidth="2" className="demo-edge"/>
                  <path d="M150 150 L250 150" stroke="var(--primary-color)" strokeWidth="2" className="demo-edge"/>
                  <path d="M250 50 L250 150" stroke="var(--primary-color)" strokeWidth="2" className="demo-edge"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Algorithm Overview */}
      <section className="overview-section">
        <div className="container">
          <h2 className="section-title">What is Dijkstra's Algorithm?</h2>
          <div className="overview-content">
            <div className="overview-text slide-in-left">
              <p className="overview-description">
                Dijkstra's algorithm is a graph traversal algorithm that finds the shortest 
                path between nodes in a weighted graph. Developed by Dutch computer scientist 
                Edsger W. Dijkstra in 1956, it's one of the most important algorithms in 
                computer science and forms the foundation for many routing protocols and 
                navigation systems.
              </p>
              <div className="key-features">
                <h3>Key Features:</h3>
                <ul>
                  <li>✅ Finds shortest path from source to all other vertices</li>
                  <li>✅ Works with non-negative edge weights</li>
                  <li>✅ Greedy algorithm approach</li>
                  <li>✅ Time complexity: O((V + E) log V)</li>
                </ul>
              </div>
            </div>
            <div className="complexity-card slide-in-right">
              <h3>Time & Space Complexity</h3>
              <div className="complexity-item">
                <span className="complexity-label">Time Complexity:</span>
                <span className="complexity-value">O((V + E) log V)</span>
              </div>
              <div className="complexity-item">
                <span className="complexity-label">Space Complexity:</span>
                <span className="complexity-value">O(V)</span>
              </div>
              <div className="complexity-note">
                Where V = vertices, E = edges
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Algorithm Types */}
      <section className="types-section">
        <div className="container">
          <h2 className="section-title">Types & Variations</h2>
          <div className="types-grid">
            <div className="type-card fade-in">
              <div className="type-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Classic Dijkstra</h3>
              <p>Original implementation using a simple array to track minimum distances.</p>
              <div className="type-complexity">O(V²)</div>
            </div>
            
            <div className="type-card fade-in">
              <div className="type-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3>Binary Heap</h3>
              <p>Optimized version using binary heap (priority queue) for better performance.</p>
              <div className="type-complexity">O((V + E) log V)</div>
            </div>
            
            <div className="type-card fade-in">
              <div className="type-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3>Fibonacci Heap</h3>
              <p>Advanced implementation with Fibonacci heap for theoretical optimality.</p>
              <div className="type-complexity">O(E + V log V)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="use-cases-section">
        <div className="container">
          <h2 className="section-title">Real-World Applications</h2>
          <div className="use-cases-grid">
            <div className="use-case-card slide-in-left">
              <div className="use-case-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3>GPS Navigation</h3>
              <p>Finding shortest routes in mapping applications like Google Maps, Waze, and GPS devices.</p>
            </div>
            
            <div className="use-case-card slide-in-left">
              <div className="use-case-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M8 21l4-7 4 7" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Network Routing</h3>
              <p>Internet routing protocols like OSPF use Dijkstra's algorithm to find optimal paths.</p>
            </div>
            
            <div className="use-case-card slide-in-right">
              <div className="use-case-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3>Game Development</h3>
              <p>AI pathfinding for NPCs, optimal resource allocation, and game strategy optimization.</p>
            </div>
            
            <div className="use-case-card slide-in-right">
              <div className="use-case-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3>Financial Systems</h3>
              <p>Currency exchange optimization, trading algorithms, and risk assessment models.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Explore?</h2>
            <p>Start your journey with Dijkstra's algorithm through interactive learning</p>
            <div className="cta-actions">
              <Link to="/visualizer" className="btn btn-primary">
                Visualize Algorithm
              </Link>
              <Link to="/editor" className="btn btn-secondary">
                Practice Coding
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntroductionPage;
