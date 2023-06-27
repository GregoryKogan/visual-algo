import { Painter } from "@/utilities/painter";
import { shuffle } from "@/utilities/shuffle";
import { sleep } from "@/utilities/sleep";

export class QuickSortSketch {
  painter: Painter;
  width: number;
  height: number;

  values: Array<number>;
  n: number;
  low: number;
  high: number;

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
    this.low = 0;
    this.high = 0;

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
    this.low = 0;
    this.high = 0;
    this.compsCounter = 0;
    this.stepsCounter = 0;
    this.values = [];
    for (let i = 1; i <= this.n; ++i) this.values.push(i);
    shuffle(this.values);

    this.curPid++;
    this.quickSort(this.curPid, 0, this.n - 1, true);
  }

  async quickSort(
    pid: number,
    low: number,
    high: number,
    main = false
  ): Promise<void> {
    if (pid != this.curPid) {
      return;
    }

    this.low = low;
    this.high = high;

    if (low < high) {
      this.compsCounter++;
      this.stepsCounter++;
      if (this.stepsCounter % this.stepsPer10ms == 0) {
        this.renderValues();
        await sleep(10);
      }
      /* pi is partitioning index, arr[p] is now 
        at right place */
      const pi = await this.partition(pid, low, high);

      // Separately sort elements before
      // partition and after partition
      await this.quickSort(pid, low, pi - 1, false);
      await this.quickSort(pid, pi + 1, high, false);
    }
    if (main && pid == this.curPid) {
      this.finished = true;
      this.renderValues();
    }
  }

  async partition(pid: number, low: number, high: number): Promise<number> {
    if (pid != this.curPid) {
      return -1;
    }

    const pivot = this.values[high]; // pivot
    let i = low - 1; // Index of smaller element and indicates the right position of pivot found so far

    for (let j = low; j <= high - 1; j++) {
      if (pid != this.curPid) {
        return -1;
      }
      this.compsCounter++;
      this.stepsCounter++;
      if (this.stepsCounter % this.stepsPer10ms == 0) {
        this.renderValues();
        await sleep(10);
      }

      // If current element is smaller than the pivot
      if (this.values[j] < pivot) {
        i++; // increment index of smaller element
        const tmp = this.values[i];
        this.values[i] = this.values[j];
        this.values[j] = tmp;
      }
    }
    const tmp = this.values[i + 1];
    this.values[i + 1] = this.values[high];
    this.values[high] = tmp;
    return i + 1;
  }

  renderValues(): void {
    this.painter.background("#282a36");
    const colWidth: number = this.width / this.n;
    const maxHeight: number = this.height;
    const ratio = maxHeight / this.n;
    for (let i = 0; i < this.n; ++i) {
      this.painter.setStrokeWeight(colWidth + 1);
      this.painter.stroke("#f8f8f2");
      if (i == this.low) {
        this.painter.stroke("#ff79c6");
      } else if (i == this.high) {
        this.painter.stroke("#ff79c6");
      }
      if ((i == this.low || i == this.high) && !this.finished) {
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
}
