import { Painter } from "@/utilities/painter";
import { shuffle } from "@/utilities/shuffle";
import { sleep } from "@/utilities/sleep";

export class CountingSortSketch {
  painter: Painter;
  width: number;
  height: number;

  values: Array<number>;
  n: number;
  i: number;

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
    this.compsCounter = 0;
    this.stepsCounter = 0;
    this.values = [];
    for (let i = 1; i <= this.n; ++i) this.values.push(i);
    shuffle(this.values);

    this.curPid++;
    this.countingSort(this.curPid);
  }

  async countingSort(pid: number): Promise<void> {
    if (pid != this.curPid) return;

    const counter = new Array<number>(this.n + 1);
    for (let i = 0; i < this.n + 1; ++i) {
      if (pid != this.curPid) return;
      counter[i] = 0;
    }

    for (let i = 0; i < this.n; ++i) {
      if (pid != this.curPid) return;
      this.compsCounter++;
      this.stepsCounter++;
      if (this.stepsCounter % this.stepsPer10ms == 0) {
        this.renderValues();
        await sleep(10);
      }
      this.i = i;
      counter[this.values[i]]++;
    }
    let k = 0;
    for (let i = 1; i <= this.n; ++i) {
      for (let j = 0; j < counter[i]; ++j) {
        if (pid != this.curPid) return;
        this.compsCounter++;
        this.stepsCounter++;
        if (this.stepsCounter % this.stepsPer10ms == 0) {
          this.renderValues();
          await sleep(10);
        }
        this.values[k] = i;
        k++;
        this.i = k;
      }
    }
    if (pid == this.curPid) {
      this.finished = true;
      this.renderValues();
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
      if (i == this.i) this.painter.stroke("#ff79c6");
      if (i == this.i && !this.finished)
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
