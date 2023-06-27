import { Painter } from "@/utilities/painter";
import { shuffle } from "@/utilities/shuffle";

export class PancakeSortSketch {
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
  curSize: number;
  maxInd: number;
  i: number;
  j: number;
  firstFlip: boolean;
  secondFlip: boolean;
  flipsCounter: number;
  itersCounter: number;
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
    this.curSize = this.n;
    this.maxInd = 0;
    this.i = 0;
    this.j = 0;
    this.firstFlip = false;
    this.secondFlip = false;
    this.flipsCounter = 0;
    this.itersCounter = 0;
    this.stepsPerFrame = 5;
    this.finished = false;
  }

  setup(data?: Record<string, number>): void {
    if (data) {
      this.n = data.n;
      this.stepsPerFrame = data.stepsPerFrame;
    }

    this.curSize = this.n;
    this.maxInd = 0;
    this.i = 0;
    this.j = 0;
    this.firstFlip = false;
    this.secondFlip = false;
    this.finished = false;
    this.flipsCounter = 0;
    this.itersCounter = 0;
    this.values = [];
    for (let i = 1; i <= this.n; ++i) this.values.push(i);
    shuffle(this.values);

    window.requestAnimationFrame(() => this.draw());
  }

  draw(): void {
    this.painter.background("#282a36");

    for (let i = 0; i < this.stepsPerFrame; ++i) this.pancakeSortStep();

    this.renderValues();

    this.updateDt();

    if (!this.finished) {
      window.requestAnimationFrame(() => this.draw());
    } else {
      this.fps = 0;
    }
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
      if (this.values[i] > maxValue) {
        maxValue = this.values[i];
      }
    const ratio = maxHeight / maxValue;
    for (let i = 0; i < this.n; ++i) {
      this.painter.setStrokeWeight(colWidth + 1);
      this.painter.stroke("#f8f8f2");
      if (i == this.curSize) {
        this.painter.stroke("#ff79c6");
      } else if (i == this.i) {
        this.painter.stroke("#8be9fd");
      } else if (i == this.j) {
        this.painter.stroke("#ffb86c");
      } else if (i == this.maxInd) {
        this.painter.stroke("#ff5555");
      }
      if ((i == this.curSize || i == this.i || i == this.j) && !this.finished) {
        this.painter.setStrokeWeight(Math.max(colWidth + 1, 7));
      }
      if (this.finished) {
        this.painter.stroke("#50fa7b");
      }
      const curHeight = ratio * this.values[i];
      this.painter.line(
        i * colWidth + colWidth / 2,
        this.height - curHeight,
        i * colWidth + colWidth / 2,
        this.height
      );
    }
  }

  pancakeSortStep(): void {
    if (this.curSize <= 1) {
      this.finished = true;
      return;
    }

    this.itersCounter++;

    if (this.i < this.curSize - 1) {
      this.i++;
      if (this.values[this.i] > this.values[this.maxInd]) {
        this.maxInd = this.i;
      }
    }
    else if (!this.firstFlip) {
      if (this.j < Math.floor((this.maxInd + 1) / 2)) {
        const tmp = this.values[this.j];
        this.values[this.j] = this.values[this.maxInd - this.j];
        this.values[this.maxInd - this.j] = tmp;
        this.j++;
      } else {
        this.firstFlip = true;
        this.flipsCounter++;
        this.j = 0;
      }
    }
    else if (!this.secondFlip) {
      if (this.j < Math.floor(this.curSize / 2)) {
        const tmp = this.values[this.j];
        this.values[this.j] = this.values[this.curSize - this.j - 1];
        this.values[this.curSize - this.j - 1] = tmp;
        this.j++;
      } else {
        this.secondFlip = true;
        this.flipsCounter++;
        this.j = 0;
      }
    } else {
      this.i = 0;
      this.curSize--;
      this.maxInd = 0;
      this.firstFlip = false;
      this.secondFlip = false;
    }
  }
}
