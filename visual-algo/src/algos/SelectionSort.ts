import { Painter } from "@/utilities/painter";
import { shuffle } from "@/utilities/shuffle";

export class SelectionSortSketch {
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
  minInd: number;
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
    this.i = 0;
    this.j = 0;
    this.minInd = 0;
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
    this.i = 0;
    this.j = 1;
    this.minInd = 0;
    this.compsCounter = 0;
    this.values = [];
    for (let i = 1; i <= this.n; ++i) this.values.push(i);
    shuffle(this.values);

    window.requestAnimationFrame(() => this.draw());
  }

  draw(): void {
    this.painter.background("#282a36");

    for (let i = 0; i < this.stepsPerFrame; ++i) this.selectionSortStep();

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
      this.painter.stroke("#f8f8f2");
      if (i == this.i) this.painter.stroke("#8be9fd");
      if (i == this.j) this.painter.stroke("#ffb86c");
      if (i == this.minInd) this.painter.stroke("#ff5555");
      if (this.finished) this.painter.stroke("#50fa7b");
      this.painter.setStrokeWeight(colWidth + 1);
      const curHeight = ratio * this.values[i];
      this.painter.line(
        i * colWidth + colWidth / 2,
        this.height - curHeight,
        i * colWidth + colWidth / 2,
        this.height
      );
    }
  }

  selectionSortStep(): void {
    if (this.i >= this.n - 1) {
      this.finished = true;
      return;
    }

    if (this.j < this.n) {
      this.j++;
      this.compsCounter++;
      if (this.values[this.j] < this.values[this.minInd]) this.minInd = this.j;
    } else {
      const tmp = this.values[this.i];
      this.values[this.i] = this.values[this.minInd];
      this.values[this.minInd] = tmp;

      this.i++;
      this.minInd = this.i;
      this.j = this.i;
    }
  }
}
