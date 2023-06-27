import { Painter } from "@/utilities/painter";
import { sleep } from "@/utilities/sleep";
import { genRandGraphEdges, genRandGraphPositions } from "@/utilities/geometry";

export class DFSSketch {
  painter: Painter;
  width: number;
  height: number;

  curPid: number;

  n: number;

  graph: Array<Array<number>>;
  positions: Array<Record<string, number>>;

  visited: Array<boolean>;
  coloredEdges: Array<Record<PropertyKey, number>>;
  currentV: number;

  visitedCounter: number;

  constructor(canvas: HTMLCanvasElement) {
    this.painter = new Painter(canvas);
    this.width = canvas.width;
    this.height = canvas.height;

    this.curPid = 0;

    this.n = 0;

    this.graph = [];
    this.positions = [];

    this.visited = [];
    this.coloredEdges = [];
    this.currentV = 0;

    this.visitedCounter = 0;
  }

  setup(data?: Record<string, number>): void {
    if (data) {
      this.n = data.n;
    }

    this.positions = genRandGraphPositions(this.n, this.width, this.height);
    this.graph = genRandGraphEdges(this.n, this.positions);

    this.visited = [];
    for (let i = 0; i < this.n; ++i) this.visited.push(false);

    this.coloredEdges = [];
    this.currentV = 0;

    this.visitedCounter = 0;

    this.curPid++;
    this.dfs(this.curPid, 0);
  }

  async dfs(pid: number, v: number, parent = -1): Promise<void> {
    if (pid != this.curPid) {
      return;
    }

    this.visited[v] = true;
    this.visitedCounter++;
    this.currentV = v;
    this.renderGraph();
    await sleep(Math.floor(20000 / this.n));
    if (pid != this.curPid) {
      return;
    }
    for (let i = 0; i < this.graph[v].length; ++i) {
      if (pid != this.curPid) {
        return;
      }
      if (!this.visited[this.graph[v][i]]) {
        this.coloredEdges.push({ from: v, to: this.graph[v][i], color: 1 });
        await this.dfs(pid, this.graph[v][i], v);
      }
    }
    if (pid != this.curPid) {
      return;
    }
    if (parent != -1) {
      const ind = this.coloredEdges.indexOf({ from: parent, to: v, color: 1 });
      if (ind != -1) {
        this.coloredEdges.splice(ind, 1);
      }
      this.coloredEdges.push({ from: parent, to: v, color: 2 });
    }
    this.currentV = parent;
    this.renderGraph();
    await sleep(Math.floor(20000 / this.n));
  }

  renderGraph(): void {
    this.painter.background("#282a36");
    this.renderEdges();
    this.renderVertecies();
  }

  renderVertecies(): void {
    for (let i = 0; i < this.n; ++i) {
      this.painter.noStroke();
      this.painter.fill("#f8f8f2");
      if (i == 0) {
        this.painter.fill("#ff5555");
      } else if (this.visited[i]) {
        this.painter.fill("#50fa7b");
      }
      if (i == this.currentV) {
        this.painter.fill("#ff79c6");
      }
      this.painter.circle(this.positions[i].x, this.positions[i].y, 10);
      if (i == this.currentV) {
        this.painter.noFill();
        this.painter.stroke("#ff79c6");
        this.painter.setStrokeWeight(2);
        this.painter.circle(this.positions[i].x, this.positions[i].y, 20);
      }
    }
  }

  renderEdges(): void {
    for (let i = 0; i < this.n; ++i) {
      for (let j = 0; j < this.graph[i].length; ++j) {
        if (i < this.graph[i][j]) {
          this.painter.stroke("#f8f8f2");
          this.painter.setStrokeWeight(3);
          this.painter.line(
            this.positions[i].x,
            this.positions[i].y,
            this.positions[this.graph[i][j]].x,
            this.positions[this.graph[i][j]].y
          );
        }
      }
    }
    this.renderUsedEdges();
  }

  renderUsedEdges(): void {
    for (let i = 0; i < this.coloredEdges.length; ++i) {
      const { from, to } = this.coloredEdges[i];
      if (this.coloredEdges[i].color == 1) {
        this.painter.stroke("#ffb86c");
      } else if (this.coloredEdges[i].color == 2) {
        this.painter.stroke("#8be9fd");
      }
      this.painter.setStrokeWeight(4);
      this.painter.line(
        this.positions[from].x,
        this.positions[from].y,
        this.positions[to].x,
        this.positions[to].y
      );
    }
  }
}
