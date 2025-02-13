import { useEffect, useState } from "react";

const Grid = () => {
  const grid = Array(20)
    .fill(0)
    .map(() => Array(20).fill(0));
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [path, setPath] = useState([]);

  const handleCellClick = (row, col) => {
    if (!start) {
      setStart([row, col]);
    } else if (!end) {
      setEnd([row, col]);
    }
  };

  const resetSelection = () => {
    setStart(null);
    setEnd(null);
    setPath([]);
  };

  useEffect(() => {
    if (start && end) {
      const foundPath = findPath(start, end);
      setPath(foundPath);
    }
  }, [start, end]);

  const findPath = (start, end, visited = new Set(), path = []) => {
    const [x, y] = start;

    if (x < 0 || y < 0 || x >= 20 || y >= 20 || visited.has(`${x},${y}`)) {
      return null;
    }

    visited.add(`${x},${y}`);
    path.push([x, y]);

    if (x === end[0] && y === end[1]) return path;

    const directions = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ];
    for (let [dx, dy] of directions) {
      const newPath = findPath([x + dx, y + dy], end, visited, [...path]);
      if (newPath) return newPath;
    }
  };

  const renderGrid = () => {
    return grid.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((col, colIndex) => (
          <div
            key={colIndex}
            onClick={() => handleCellClick(rowIndex, colIndex)}
            className={`cell
                ${
                  path.some((p) => p[0] === rowIndex && p[1] === colIndex)
                    ? "path"
                    : ""
                }
                 ${
                   start &&
                   start[0] === rowIndex &&
                   start[1] === colIndex &&
                   "startCell"
                 } ${
              end && end[0] === rowIndex && end[1] === colIndex ? "endCell" : ""
            }`}></div>
        ))}
      </div>
    ));
  };
  return (
    <div>
      <h1>Find Path Using DFS(Deepest First Search)</h1>

      <div>
        <h3>Select start and end tiles to start</h3>
        <div className="cell-container-indic">
          <div className="cell startCell"></div>
          <p>Start</p>
        </div>

        <div className="cell-container-indic">
          <div className="cell endCell"></div>
          <p>End</p>
        </div>

        <div className="cell-container-indic">
          <div className="cell path"></div>
          <p>Path</p>
        </div>
      </div>

      {renderGrid()}

      <div className="btn-container">
        <button className="reset-btn" onClick={resetSelection}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Grid;
