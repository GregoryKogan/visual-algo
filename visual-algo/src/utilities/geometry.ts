export function segSegIntersection(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  x4: number,
  y4: number
): boolean {
  const t =
    ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) /
    ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
  const u =
    ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) /
    ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
  return t >= 0 && t <= 1 && u >= 0 && u <= 1;
}

export function genRandGraphPositions(
  n: number,
  width: number,
  height: number
): Array<Record<PropertyKey, number>> {
  const positions: Array<Record<PropertyKey, number>> = [];

  const offset = 20;
  for (let i = 0; i < n; ++i) {
    const x = Math.random() * (width - 2 * offset) + offset;
    const y = Math.random() * (height - 2 * offset) + offset;
    positions.push({ x: x, y: y });
  }

  return positions;
}

export function genRandGraphEdges(
  n: number,
  positions: Array<Record<PropertyKey, number>>
): Array<Array<number>> {
  const graph: Array<Array<number>> = [];
  for (let i = 0; i < n; ++i) graph.push([]);

  for (let i = 0; i < n; ++i) {
    const nearPoints: Array<Record<PropertyKey, number>> = [];
    for (let j = 0; j < n; ++j) {
      if (i != j) {
        const dist = Math.sqrt(
          Math.pow(positions[i].x - positions[j].x, 2) +
            Math.pow(positions[i].y - positions[j].y, 2)
        );
        nearPoints.push({ dist: dist, ind: j });
      }
    }
    nearPoints.sort((a, b) => a.dist - b.dist);
    const neighbours = Math.floor(Math.random() * 5 + 2);
    for (let j = 0; j < neighbours; ++j) {
      const nInd = nearPoints[j].ind;
      if (i != nInd && !graph[i].includes(nInd)) {
        graph[i].push(nInd);
        graph[nInd].push(i);
      }
    }
  }

  return graph;
}
