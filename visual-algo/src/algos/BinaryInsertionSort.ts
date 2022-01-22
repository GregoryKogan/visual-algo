import { Painter } from "@/utilities/painter";
import { shuffle } from "@/utilities/shuffle";

export class BinaryInsertionSortSketch {
  painter: Painter;
  width: number;
  height: number;

  dt: number;
  lastDts: Array<number>;
  dtMemory: number;
  lastFrame: number;
  fps: number;

  values: Array<number>;
  n: number;
  i: number;
  j: number;
  key: number;
  low: number;
  high: number;
  loc: number;
  foundLoc: boolean;
  compsCounter: number;
  stepsPerFrame: number;
  finished: boolean;

  constructor(canvas: HTMLCanvasElement) {
    this.painter = new Painter(canvas);
    this.width = canvas.width;
    this.height = canvas.height;

    this.dt = 1;
    this.lastDts = [];
    this.dtMemory = 10;
    for (let i = 0; i < this.dtMemory; ++i) this.lastDts.push(1);
    this.lastFrame = performance.now();
    this.fps = 0;

    this.values = [];
    this.n = 100;
    this.i = 1;
    this.j = 0;
    this.key = 0;
    this.low = 0;
    this.high = 0;
    this.loc = 0;
    this.foundLoc = false;
    this.compsCounter = 0;
    this.stepsPerFrame = 5;
    this.finished = false;
  }

  setup(data?: Record<string, number>): void {
    if (data) {
      this.n = data.n;
      this.stepsPerFrame = data.stepsPerFrame;
    }

    this.finished = false;
    this.i = 1;
    this.j = 0;
    this.low = 0;
    this.high = 0;
    this.loc = 0;
    this.foundLoc = false;
    this.compsCounter = 0;
    this.values = [];
    for (let i = 1; i <= this.n; ++i) this.values.push(i);
    shuffle(this.values);

    this.key = this.values[1];

    window.requestAnimationFrame(() => this.draw());
  }

  draw(): void {
    this.painter.background("#282a36");

    for (let i = 0; i < this.stepsPerFrame; ++i) this.insertionSortStep();

    this.renderValues();

    this.updateDt();

    if (!this.finished) window.requestAnimationFrame(() => this.draw());
    else this.fps = 0;
  }

  updateDt(): void {
    const curFrame = performance.now();
    const curDt = curFrame - this.lastFrame;
    this.lastFrame = curFrame;
    this.lastDts.push(curDt);

    const removed = this.lastDts.shift();
    if (removed) {
      this.dt -= removed / this.dtMemory;
      this.dt += curDt / this.dtMemory;
    }

    this.fps = Math.round(1000 / this.dt);
    this.fps -= this.fps % 5;
  }

  renderValues(): void {
    const colWidth: number = this.width / this.n;
    const maxHeight: number = this.height;
    let maxValue = this.values[0];
    for (let i = 1; i < this.n; ++i)
      if (this.values[i] > maxValue) maxValue = this.values[i];
    const ratio = maxHeight / maxValue;
    for (let i = 0; i < this.n; ++i) {
      this.painter.setStrokeWeight(colWidth + 1);
      this.painter.stroke("#f8f8f2");
      if (i == this.i) this.painter.stroke("#8be9fd");
      else if (i == this.j) this.painter.stroke("#ffb86c");
      else if (i == this.loc) this.painter.stroke("#ff79c6");
      if ((i == this.i || i == this.j || i == this.loc) && !this.finished)
        this.painter.setStrokeWeight(Math.max(colWidth + 1, 7));
      if (this.finished) this.painter.stroke("#50fa7b");
      const curHeight = ratio * this.values[i];
      this.painter.line(
        i * colWidth + colWidth / 2,
        this.height - curHeight,
        i * colWidth + colWidth / 2,
        this.height
      );
    }
  }

  insertionSortStep(): void {
    if (this.i >= this.n) {
      this.finished = true;
      return;
    }

    this.compsCounter++;

    if (this.values[0] < this.values[1] && this.i == 1) {
      const tmp = this.values[0];
      this.values[0] = this.values[1];
      this.values[1] = tmp;
      this.key = this.values[1];
    }

    if (this.j >= this.loc) {
      this.values[this.j + 1] = this.values[this.j];
      this.j--;
      this.foundLoc = false;
    } else {
      if (this.loc == Infinity) {
        if (this.low <= this.high) {
          const mid = Math.floor((this.low + this.high) / 2);
          if (this.key == this.values[mid]) {
            this.loc = mid + 1;
            if (this.loc <= this.j) this.foundLoc = true;
          } else if (this.key > this.values[mid]) this.low = mid + 1;
          else this.high = mid - 1;
        } else {
          this.loc = this.low;
          if (this.loc <= this.j) this.foundLoc = true;
        }
      } else if (!this.foundLoc) {
        this.values[this.j + 1] = this.key;
        this.i++;
        this.key = this.values[this.i];
        this.j = this.i - 1;
        this.low = 0;
        this.high = this.j;
        this.loc = Infinity;
      }
    }
  }
}
