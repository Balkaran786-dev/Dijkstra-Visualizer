import React, {Component} from 'react';

import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';

import './PathfindingVisualizer.css';

const INITIAL_START_NODE_ROW = 10;
const INITIAL_START_NODE_COL = 15;
const INITIAL_FINISH_NODE_ROW = 10;
const INITIAL_FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      isRunning: false,
      isStartNode: false,
      isFinishNode: false,
      isWallNode: false,
      currRow: 0,
      currCol: 0,
      startNodeRow: INITIAL_START_NODE_ROW,
      startNodeCol: INITIAL_START_NODE_COL,
      finishNodeRow: INITIAL_FINISH_NODE_ROW,
      finishNodeCol: INITIAL_FINISH_NODE_COL,
      mode: 'wall', // 'wall', 'start', 'finish'
      speed: 'normal', // 'slow', 'normal', 'fast'
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    if (this.state.isRunning) return;

    const { mode, grid } = this.state;

    if (mode === 'start') {
      this.handleStartNodeChange(row, col);
    } else if (mode === 'finish') {
      this.handleFinishNodeChange(row, col);
    } else if (mode === 'wall') {
      if (!grid[row][col].isStart && !grid[row][col].isFinish) {
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        this.setState({grid: newGrid, mouseIsPressed: true});
      }
    }
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed || this.state.isRunning) return;

    const { mode, grid } = this.state;

    if (mode === 'wall' && !grid[row][col].isStart && !grid[row][col].isFinish) {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      this.setState({grid: newGrid});
    }
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  handleStartNodeChange(row, col) {
    const { grid, finishNodeRow, finishNodeCol } = this.state;
    if (row === finishNodeRow && col === finishNodeCol) return;

    const newGrid = getNewGridWithStartNodeMoved(grid, row, col, this.state.startNodeRow, this.state.startNodeCol);
    this.setState({
      grid: newGrid,
      startNodeRow: row,
      startNodeCol: col,
    });
  }

  handleFinishNodeChange(row, col) {
    const { grid, startNodeRow, startNodeCol } = this.state;
    if (row === startNodeRow && col === startNodeCol) return;

    const newGrid = getNewGridWithFinishNodeMoved(grid, row, col, this.state.finishNodeRow, this.state.finishNodeCol);
    this.setState({
      grid: newGrid,
      finishNodeRow: row,
      finishNodeCol: col,
    });
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    const { speed } = this.state;
    const speedMultiplier = speed === 'slow' ? 50 : speed === 'normal' ? 20 : 5;

    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, speedMultiplier * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
        if (nodeElement) {
          nodeElement.className = 'node node-visited';
        }
      }, speedMultiplier * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    const { speed } = this.state;
    const speedMultiplier = speed === 'slow' ? 100 : speed === 'normal' ? 50 : 20;

    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
        if (nodeElement) {
          nodeElement.className = 'node node-shortest-path';
        }
        if (i === nodesInShortestPathOrder.length - 1) {
          this.setState({ isRunning: false });
        }
      }, speedMultiplier * i);
    }
  }

  visualizeDijkstra() {
    if (this.state.isRunning) return;

    const { grid, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol } = this.state;

    // Check if start and finish nodes are set
    if (startNodeRow === null || startNodeCol === null || finishNodeRow === null || finishNodeCol === null) {
      alert('Please set both start and finish nodes before visualizing the algorithm!');
      return;
    }

    this.setState({ isRunning: true });
    this.clearPath();

    setTimeout(() => {
      const startNode = grid[startNodeRow][startNodeCol];
      const finishNode = grid[finishNodeRow][finishNodeCol];
      const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }, 100);
  }

  clearGrid() {
    if (this.state.isRunning) return;

    // Completely reset everything - remove start/end nodes, walls, and paths
    const newGrid = [];
    for (let row = 0; row < 25; row++) {
      const currentRow = [];
      for (let col = 0; col < 55; col++) {
        currentRow.push({
          col,
          row,
          isStart: false,
          isFinish: false,
          distance: Infinity,
          isVisited: false,
          isWall: false,
          previousNode: null,
        });
      }
      newGrid.push(currentRow);
    }

    this.setState({
      grid: newGrid,
      startNodeRow: null,
      startNodeCol: null,
      finishNodeRow: null,
      finishNodeCol: null,
    });

    // Clear all visual classes
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(node => {
      node.classList.remove('node-visited', 'node-shortest-path');
    });
  }

  clearWalls() {
    if (this.state.isRunning) return;

    // Only remove walls, keep start/end nodes and clear any paths
    const { grid } = this.state;
    const newGrid = grid.map(row =>
      row.map(node => ({
        ...node,
        isWall: false,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
      }))
    );
    this.setState({ grid: newGrid });

    // Clear path visual classes but keep start/end nodes
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(node => {
      node.classList.remove('node-visited', 'node-shortest-path');
    });
  }

  clearPath() {
    if (this.state.isRunning) return;

    // Only clear the explored path data, keep start/end nodes and walls exactly as they are
    const { grid } = this.state;
    const newGrid = grid.map(row =>
      row.map(node => ({
        ...node,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
        // Preserve all other properties: isStart, isFinish, isWall remain unchanged
      }))
    );
    this.setState({ grid: newGrid });

    // Clear only path visual classes, keep start/end/wall styling intact
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(node => {
      node.classList.remove('node-visited', 'node-shortest-path');
      // Note: start, finish, and wall classes are preserved
    });
  }

  setMode(mode, event) {
    if (this.state.isRunning) return;

    // Add click animation
    const button = event.target;
    button.classList.add('clicked', 'ripple');

    // Remove animation classes after animation completes
    setTimeout(() => {
      button.classList.remove('clicked');
    }, 200);

    setTimeout(() => {
      button.classList.remove('ripple');
    }, 600);

    this.setState({ mode });
  }

  setSpeed(speed, event) {
    if (this.state.isRunning) return;

    // Add click animation
    const button = event.target;
    button.classList.add('clicked', 'ripple');

    // Remove animation classes after animation completes
    setTimeout(() => {
      button.classList.remove('clicked');
    }, 200);

    setTimeout(() => {
      button.classList.remove('ripple');
    }, 600);

    this.setState({ speed });
  }

  render() {
    const { grid, mouseIsPressed, mode, speed, isRunning } = this.state;

    return (
      <div className="pathfinding-visualizer">
        {/* Control Panel */}
        <div className="control-panel">
          <div className="control-section">
            <h3>Mode</h3>
            <div className="mode-buttons">
              <button
                className={`mode-btn ${mode === 'wall' ? 'active' : ''}`}
                onClick={(e) => this.setMode('wall', e)}
                disabled={isRunning}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
                </svg>
                Add Walls
              </button>
              <button
                className={`mode-btn ${mode === 'start' ? 'active' : ''}`}
                onClick={(e) => this.setMode('start', e)}
                disabled={isRunning}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="var(--success-color)"/>
                </svg>
                Move Start
              </button>
              <button
                className={`mode-btn ${mode === 'finish' ? 'active' : ''}`}
                onClick={(e) => this.setMode('finish', e)}
                disabled={isRunning}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="var(--error-color)"/>
                </svg>
                Move Finish
              </button>
            </div>
          </div>

          <div className="control-section">
            <h3>Speed</h3>
            <div className="speed-buttons">
              <button
                className={`speed-btn ${speed === 'slow' ? 'active' : ''}`}
                onClick={(e) => this.setSpeed('slow', e)}
                disabled={isRunning}
              >
                Slow
              </button>
              <button
                className={`speed-btn ${speed === 'normal' ? 'active' : ''}`}
                onClick={(e) => this.setSpeed('normal', e)}
                disabled={isRunning}
              >
                Normal
              </button>
              <button
                className={`speed-btn ${speed === 'fast' ? 'active' : ''}`}
                onClick={(e) => this.setSpeed('fast', e)}
                disabled={isRunning}
              >
                Fast
              </button>
            </div>
          </div>

          <div className="control-section">
            <h3>Actions</h3>
            <div className="action-buttons">
              <button
                className="action-btn visualize-btn"
                onClick={() => this.visualizeDijkstra()}
                disabled={isRunning}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <polygon points="5,3 19,12 5,21" fill="currentColor"/>
                </svg>
                {isRunning ? 'Running...' : 'Visualize'}
              </button>
              <button
                className="action-btn clear-btn"
                onClick={() => this.clearPath()}
                disabled={isRunning}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
                Clear Path
              </button>
              <button
                className="action-btn clear-btn"
                onClick={() => this.clearWalls()}
                disabled={isRunning}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Clear Walls
              </button>
              <button
                className="action-btn reset-btn"
                onClick={() => this.clearGrid()}
                disabled={isRunning}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M8 16l-5 5v-5h5" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
                Reset Grid
              </button>
            </div>
          </div>
        </div>

        {/* Current Mode Indicator */}
        <div className="mode-indicator">
          <span className="mode-text">
            Current Mode: <strong>
              {mode === 'wall' && 'Adding Walls (Click and drag to create walls)'}
              {mode === 'start' && 'Setting Start Node (Click anywhere to place the green start node)'}
              {mode === 'finish' && 'Setting Finish Node (Click anywhere to place the red finish node)'}
            </strong>
          </span>
        </div>

        {/* Grid */}
        <div className="grid-container">
          <div className="grid">
            {grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx} className="grid-row">
                  {row.map((node, nodeIdx) => {
                    const {row, col, isFinish, isStart, isWall} = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                        onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                        onMouseUp={() => this.handleMouseUp()}
                        row={row}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 25; row++) {
    const currentRow = [];
    for (let col = 0; col < 55; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === INITIAL_START_NODE_ROW && col === INITIAL_START_NODE_COL,
    isFinish: row === INITIAL_FINISH_NODE_ROW && col === INITIAL_FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  if (node.isStart || node.isFinish) return newGrid;

  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithStartNodeMoved = (grid, newRow, newCol, oldRow, oldCol) => {
  const newGrid = grid.slice();

  // Remove start from old position (if it exists)
  if (oldRow !== null && oldCol !== null) {
    const oldNode = newGrid[oldRow][oldCol];
    const updatedOldNode = {
      ...oldNode,
      isStart: false,
    };
    newGrid[oldRow][oldCol] = updatedOldNode;
  }

  // Add start to new position
  const newNode = newGrid[newRow][newCol];
  const updatedNewNode = {
    ...newNode,
    isStart: true,
    isWall: false,
  };
  newGrid[newRow][newCol] = updatedNewNode;

  return newGrid;
};

const getNewGridWithFinishNodeMoved = (grid, newRow, newCol, oldRow, oldCol) => {
  const newGrid = grid.slice();

  // Remove finish from old position (if it exists)
  if (oldRow !== null && oldCol !== null) {
    const oldNode = newGrid[oldRow][oldCol];
    const updatedOldNode = {
      ...oldNode,
      isFinish: false,
    };
    newGrid[oldRow][oldCol] = updatedOldNode;
  }

  // Add finish to new position
  const newNode = newGrid[newRow][newCol];
  const updatedNewNode = {
    ...newNode,
    isFinish: true,
    isWall: false,
  };
  newGrid[newRow][newCol] = updatedNewNode;

  return newGrid;
};
