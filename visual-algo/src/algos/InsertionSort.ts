import { Painter } from "@/utilities/painter";
import { shuffle } from "@/utilities/shuffle";
import { sleep } from "@/utilities/sleep";

export class InsertionSortSketch {
  painter: Painter;
  width: number;
  height: number;

  values: Array<number>;
  n: number;
  i: number;
  j: number;

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
    this.i = 0;
    this.j = 0;

    this.stepsPer10ms = 1;
    this.compsCounter = 0;
    this.stepsCounter = 0;
    this.finished = false;
    this.curPid = 0;
  }

  setup(data?: Record<string, number>): void {
    if (data) {
      this.n = data.n;
      this.stepsPer10ms = Math.round(data.stepsPerSecond / 100);
    }

    this.finished = false;
    this.i = 0;
    this.j = 0;
    this.compsCounter = 0;
    this.stepsCounter = 0;
    this.values = [];
    for (let i = 1; i <= this.n; ++i) this.values.push(i);
    shuffle(this.values);

    this.curPid++;
    this.insertionSort(this.curPid);
  }

  async insertionSort(pid: number): Promise<void> {
    for (let i = 1; i < this.n; ++i) {
      const key = this.values[i];
      let j = i - 1;
      while (j >= 0 && this.values[j] > key) {
        if (pid != this.curPid) return;

        this.compsCounter++;

        this.values[j + 1] = this.values[j];
        j--;

        this.i = i;
        this.j = j;
        this.stepsCounter++;
        if (this.stepsCounter % this.stepsPer10ms == 0) {
          this.renderValues();
          await sleep(10);
        }
      }
      if (pid != this.curPid) return;
      this.values[j + 1] = key;
    }
    this.finished = true;
    this.renderValues();
  }

  renderValues(): void {
    this.painter.background("#282a36");
    const colWidth: number = this.width / this.n;
    const maxHeight: number = this.height;
    const ratio = maxHeight / this.n;
    for (let i = 0; i < this.n; ++i) {
      this.painter.setStrokeWeight(colWidth + 1);
      this.painter.stroke("#f8f8f2");
      if (i == this.i) this.painter.stroke("#8be9fd");
      else if (i == this.j) this.painter.stroke("#ffb86c");
      if ((i == this.i || i == this.j) && !this.finished)
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
