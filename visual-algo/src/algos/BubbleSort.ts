import { Painter } from "@/utilities/painter";

class BubbleSortSketch {
  painter: Painter;
  width: number;
  height: number;

  posX: number;

  constructor(canvas: HTMLCanvasElement) {
    this.painter = new Painter(canvas);
    this.width = canvas.width;
    this.height = canvas.height;

    this.posX = this.width / 2;
  }

  setup() {
    this.painter.fill("#50fa7b");
    this.painter.noStroke();
    window.requestAnimationFrame(() => this.draw());
  }

  draw() {
    this.painter.background("#282a36");
    this.posX += 5;
    this.posX %= this.width;
    this.painter.circle(this.posX, this.height / 2, 50);
    window.requestAnimationFrame(() => this.draw());
  }
}

export function sketchInit(canvas: HTMLCanvasElement): void {
  const sketch = new BubbleSortSketch(canvas);
  sketch.setup();
}
