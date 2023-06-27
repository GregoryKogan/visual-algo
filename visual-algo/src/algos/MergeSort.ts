import { Painter } from "@/utilities/painter";
import { shuffle } from "@/utilities/shuffle";
import { sleep } from "@/utilities/sleep";

export class MergeSortSketch {
  painter: Painter;
  width: number;
  height: number;

  values: Array<number>;
  n: number;
  l: number;
  m: number;
  r: number;

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
    this.l = 0;
    this.m = 0;
    this.r = 0;

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
    this.compsCounter = 0;
    this.stepsCounter = 0;
    this.l = 0;
    this.m = 0;
    this.r = 0;
    this.values = [];
    for (let i = 1; i <= this.n; ++i) this.values.push(i);
    shuffle(this.values);

    this.curPid++;
    this.mergeSort(this.curPid, 0, this.n - 1, true);
  }

  async mergeSort(
    pid: number,
    l: number,
    r: number,
    main = false
  ): Promise<void> {
    if (pid != this.curPid) {
      return;
    }

    this.stepsCounter++;

    this.compsCounter++;
    if (l >= r) {
      return;
    } //returns recursively

    const m = l + Math.floor((r - l) / 2);
    await this.mergeSort(pid, l, m);
    if (pid != this.curPid) {
      return;
    }
    await this.mergeSort(pid, m + 1, r);
    if (pid != this.curPid) {
      return;
    }
    await this.merge(pid, l, m, r);
    if (pid != this.curPid) {
      return;
    }

    if (main) {
      this.finished = true;
      this.renderValues();
    }
  }

  async merge(pid: number, l: number, m: number, r: number): Promise<void> {
    if (pid != this.curPid) {
      return;
    }

    this.l = l;
    this.m = m;
    this.r = r;

    this.stepsCounter++;

    const n1 = m - l + 1;
    const n2 = r - m;

    // Create temp arrays
    const L = new Array(n1);
    const R = new Array(n2);

    // Copy data to temp arrays L[] and R[]
    for (let i = 0; i < n1; i++) {
      if (pid != this.curPid) {
        return;
      }
      this.stepsCounter++;
      this.compsCounter++;
      L[i] = this.values[l + i];
      if (this.stepsCounter % this.stepsPer10ms == 0) {
        this.renderValues();
        await sleep(10);
      }
    }
    for (let j = 0; j < n2; j++) {
      if (pid != this.curPid) {
        return;
      }
      this.stepsCounter++;
      this.compsCounter++;
      R[j] = this.values[m + 1 + j];
      if (this.stepsCounter % this.stepsPer10ms == 0) {
        this.renderValues();
        await sleep(10);
      }
    }

    // Merge the temp arrays back into arr[l..r]

    // Initial index of first subarray
    let i = 0;

    // Initial index of second subarray
    let j = 0;

    // Initial index of merged subarray
    let k = l;

    while (i < n1 && j < n2) {
      if (pid != this.curPid) {
        return;
      }
      this.stepsCounter++;
      this.compsCounter++;
      if (L[i] <= R[j]) {
        this.values[k] = L[i];
        i++;
      } else {
        this.values[k] = R[j];
        j++;
      }
      k++;
      if (this.stepsCounter % this.stepsPer10ms == 0) {
        this.renderValues();
        await sleep(10);
      }
    }

    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
      if (pid != this.curPid) {
        return;
      }
      this.stepsCounter++;
      this.compsCounter++;
      this.values[k] = L[i];
      i++;
      k++;
      if (this.stepsCounter % this.stepsPer10ms == 0) {
        this.renderValues();
        await sleep(10);
      }
    }

    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
      if (pid != this.curPid) {
        return;
      }
      this.stepsCounter++;
      this.compsCounter++;
      this.values[k] = R[j];
      j++;
      k++;
      if (this.stepsCounter % this.stepsPer10ms == 0) {
        this.renderValues();
        await sleep(10);
      }
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
      if (i == this.l) {
        this.painter.stroke("#ff79c6");
      } else if (i == this.m) {
        this.painter.stroke("#ff5555");
      } else if (i == this.r) {
        this.painter.stroke("#ff79c6");
      }
      if ((i == this.l || i == this.m || i == this.r) && !this.finished) {
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
