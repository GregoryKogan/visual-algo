import { Painter } from "@/utilities/painter";
import { shuffle } from "@/utilities/shuffle";
import { sleep } from "@/utilities/sleep";

export class RadixSortSketch {
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
    this.n = 500;
    this.i = 0;

    this.stepsPer10ms = 10;
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
    this.radixSort(this.curPid);
  }

  async radixSort(pid: number): Promise<void> {
    if (pid != this.curPid) return;

    // Find the maximum number to know number of digits
    const m = await this.getMax(pid);

    // Do counting sort for every digit. Note that
    // instead of passing digit number, exp is passed.
    // exp is 10^i where i is current digit number
    for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10) {
      if (pid != this.curPid) return;
      this.compsCounter++;
      this.stepsCounter++;
      if (this.stepsCounter % this.stepsPer10ms == 0) {
        this.renderValues();
        await sleep(10);
      }
      await this.countSort(pid, exp);
    }

    if (pid == this.curPid) {
      this.finished = true;
      this.renderValues();
    }
  }

  async getMax(pid: number): Promise<number> {
    if (pid != this.curPid) return 0;

    let mx = this.values[0];
    for (let i = 1; i < this.n; i++) {
      if (pid != this.curPid) return 0;
      this.compsCounter++;
      this.stepsCounter++;
      if (this.stepsCounter % this.stepsPer10ms == 0) {
        this.renderValues();
        await sleep(10);
      }
      if (this.values[i] > mx) mx = this.values[i];
    }
    return mx;
  }

  async countSort(pid: number, exp: number): Promise<void> {
    if (pid != this.curPid) return;

    const output = new Array(this.n); // output array
    let i;
    const count = new Array(10);
    for (let i = 0; i < 10; i++) {
      this.compsCounter++;
      this.stepsCounter++;
      if (this.stepsCounter % this.stepsPer10ms == 0) {
        this.renderValues();
        await sleep(10);
      }
      count[i] = 0;
    }

    // Store count of occurrences in count[]
    for (i = 0; i < this.n; i++) {
      if (pid != this.curPid) return;
      this.i = i;
      this.compsCounter++;
      this.stepsCounter++;
      if (this.stepsCounter % this.stepsPer10ms == 0) {
        this.renderValues();
        await sleep(10);
      }
      count[Math.floor(this.values[i] / exp) % 10]++;
    }

    // Change count[i] so that count[i] now contains
    // actual position of this digit in output[]
    for (i = 1; i < 10; i++) {
      if (pid != this.curPid) return;
      this.compsCounter++;
      this.stepsCounter++;
      if (this.stepsCounter % this.stepsPer10ms == 0) {
        this.renderValues();
        await sleep(10);
      }
      count[i] += count[i - 1];
    }

    // Build the output array
    for (i = this.n - 1; i >= 0; i--) {
      if (pid != this.curPid) return;
      this.compsCounter++;
      this.stepsCounter++;
      if (this.stepsCounter % this.stepsPer10ms == 0) {
        this.renderValues();
        await sleep(10);
      }
      output[count[Math.floor(this.values[i] / exp) % 10] - 1] = this.values[i];
      count[Math.floor(this.values[i] / exp) % 10]--;
    }

    // Copy the output array to arr[], so that arr[] now
    // contains sorted numbers according to current digit
    for (i = 0; i < this.n; i++) {
      if (pid != this.curPid) return;
      this.compsCounter++;
      this.stepsCounter++;
      if (this.stepsCounter % this.stepsPer10ms == 0) {
        this.renderValues();
        await sleep(10);
      }
      this.values[i] = output[i];
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
