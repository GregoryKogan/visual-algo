import { Painter } from "@/utilities/painter";
import { shuffle } from "@/utilities/shuffle";
import { sleep } from "@/utilities/sleep";

export class BinaryInsertionSortSketch {
  painter: Painter;
  width: number;
  height: number;

  values: Array<number>;
  n: number;
  i: number;
  j: number;
  low: number;
  high: number;
  loc: number;

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
    this.low = 0;
    this.high = 0;
    this.loc = 0;

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
    this.low = 0;
    this.high = 0;
    this.loc = 0;
    this.compsCounter = 0;
    this.stepsCounter = 0;
    this.values = [];
    for (let i = 1; i <= this.n; ++i) this.values.push(i);
    shuffle(this.values);

    this.curPid++;
    this.binaryInsertionSort(this.curPid);
  }

  async binaryInsertionSort(pid: number): Promise<void> {
    for (let i = 0; i < this.n; ++i) {
      let j = i - 1;
      const selected = this.values[i];

      let location = -1;
      let low = 0;
      let high = j;
      while (low <= high) {
        if (pid != this.curPid) return;

        this.compsCounter += 2;

        this.i = i;
        this.j = j;
        this.low = low;
        this.high = high;
        this.loc = location;
        this.stepsCounter++;
        if (this.stepsCounter % this.stepsPer10ms == 0) {
          this.renderValues();
          await sleep(10);
        }

        const mid = low + Math.floor((high - low) / 2);
        if (selected == this.values[mid]) {
          location = mid + 1;
          break;
        } else if (selected > this.values[mid]) low = mid + 1;
        else high = mid - 1;
      }
      if (location == -1) location = low;

      while (j >= location) {
        if (pid != this.curPid) return;

        this.compsCounter++;
        this.values[j + 1] = this.values[j];
        j--;

        this.i = i;
        this.j = j;
        this.low = low;
        this.high = high;
        this.loc = location;
        this.stepsCounter++;
        if (this.stepsCounter % this.stepsPer10ms == 0) {
          this.renderValues();
          await sleep(10);
        }
      }
      this.values[j + 1] = selected;
    }
    this.finished = true;
    this.renderValues();
  }

  renderValues(): void {
    this.painter.background("#282a36");
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
      else if (i == this.low) this.painter.stroke("#ff79c6");
      else if (i == this.high) this.painter.stroke("#ff79c6");
      if (i == this.loc) this.painter.stroke("#ff5555");
      if (
        (i == this.i ||
          i == this.j ||
          i == this.low ||
          i == this.high ||
          i == this.loc) &&
        !this.finished
      )
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
