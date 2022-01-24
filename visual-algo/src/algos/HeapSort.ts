import { Painter } from "@/utilities/painter";
import { shuffle } from "@/utilities/shuffle";
import { sleep } from "@/utilities/sleep";

export class HeapSortSketch {
  painter: Painter;
  width: number;
  height: number;

  values: Array<number>;
  n: number;
  hn: number;
  hi: number;

  stepsPer100ms: number;
  stepsPer10ms: number;
  compsCounter: number;
  stepsCounter: number;
  finished: boolean;
  curPid: number;

  constructor(canvas: HTMLCanvasElement) {
    this.painter = new Painter(canvas);
    this.width = canvas.width;
    this.height = canvas.height;

    this.values = [];
    this.n = 100;
    this.hn = 0;
    this.hi = 0;

    this.stepsPer100ms = 5;
    this.stepsPer10ms = Infinity;
    this.compsCounter = 0;
    this.stepsCounter = 0;
    this.finished = false;
    this.curPid = 0;
  }

  setup(data?: Record<string, number>): void {
    if (data) {
      this.n = data.n;
      if (data.stepsPerSecond < 100) {
        this.stepsPer100ms = Math.round(data.stepsPerSecond / 10);
        this.stepsPer10ms = Infinity;
      } else {
        this.stepsPer10ms = Math.round(data.stepsPerSecond / 100);
        this.stepsPer100ms = Infinity;
      }
    }

    this.finished = false;
    this.compsCounter = 0;
    this.stepsCounter = 0;
    this.values = [];
    for (let i = 1; i <= this.n; ++i) this.values.push(i);
    shuffle(this.values);

    this.curPid++;
    this.heapSort(this.curPid);
  }

  async heapSort(pid: number): Promise<void> {
    if (pid != this.curPid) return;

    // Build heap (rearrange array)
    for (let i = Math.floor(this.n / 2) - 1; i >= 0; --i) {
      if (pid != this.curPid) return;
      this.compsCounter++;
      this.stepsCounter++;
      if (this.stepsCounter % this.stepsPer100ms == 0) {
        this.renderValues();
        await sleep(100);
      } else if (this.stepsCounter % this.stepsPer10ms == 0) {
        this.renderValues();
        await sleep(10);
      }

      await this.heapify(pid, this.n, i);
    }

    // One by one extract an element from heap
    for (let i = this.n - 1; i > 0; --i) {
      if (pid != this.curPid) return;
      this.compsCounter++;
      this.stepsCounter++;
      if (this.stepsCounter % this.stepsPer100ms == 0) {
        this.renderValues();
        await sleep(100);
      } else if (this.stepsCounter % this.stepsPer10ms == 0) {
        this.renderValues();
        await sleep(10);
      }

      // Move current root to end
      const tmp = this.values[0];
      this.values[0] = this.values[i];
      this.values[i] = tmp;

      // call max heapify on the reduced heap
      await this.heapify(pid, i, 0);
    }

    this.finished = true;
    this.renderValues();
  }

  async heapify(pid: number, n: number, i: number): Promise<void> {
    if (pid != this.curPid) return;
    this.hn = n;
    this.hi = i;

    this.stepsCounter++;
    this.compsCounter += 3;
    if (this.stepsCounter % this.stepsPer100ms == 0) {
      this.renderValues();
      await sleep(100);
    } else if (this.stepsCounter % this.stepsPer10ms == 0) {
      this.renderValues();
      await sleep(10);
    }

    let largest = i; // Initialize largest as root
    const l = 2 * i + 1; // left = 2*i + 1
    const r = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    if (l < n && this.values[l] > this.values[largest]) largest = l;

    // If right child is larger than largest so far
    if (r < n && this.values[r] > this.values[largest]) largest = r;

    // If largest is not root
    if (largest != i) {
      const tmp = this.values[i];
      this.values[i] = this.values[largest];
      this.values[largest] = tmp;

      // Recursively heapify the affected sub-tree
      await this.heapify(pid, n, largest);
    }
  }

  renderValues(): void {
    this.painter.background("#282a36");
    const colWidth: number = this.width / this.n;
    const maxHeight: number = this.height;
    const ratio = maxHeight / this.n;
    for (let i = 0; i < this.n; ++i) {
      this.painter.setStrokeWeight(colWidth + 1);
      this.painter.stroke("#f8f8f2");
      if (i == this.hi) this.painter.stroke("#8be9fd");
      else if (i == this.hn) this.painter.stroke("#ffb86c");
      if ((i == this.hi || i == this.hn) && !this.finished)
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
}
