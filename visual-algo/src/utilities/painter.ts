export function isCanvas(
  obj: HTMLCanvasElement | HTMLElement
): obj is HTMLCanvasElement {
  return obj.tagName === "CANVAS";
}

export class Painter {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  width: number;
  height: number;
  doFill: boolean;
  fillStyle: string;
  doStroke: boolean;
  strokeStyle: string;
  strokeWeight: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.doFill = false;
    this.fillStyle = "#ffffff";
    this.doStroke = false;
    this.strokeStyle = "#000000";
    this.strokeWeight = 1;
  }

  background(color: string): void {
    if (!this.ctx) return;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  fill(color: string): void {
    this.doFill = true;
    this.fillStyle = color;
  }

  noFill(): void {
    this.doFill = false;
  }

  stroke(color: string): void {
    this.doStroke = true;
    this.strokeStyle = color;
  }

  noStroke(): void {
    this.doStroke = false;
  }

  setStrokeWeight(weight: number): void {
    this.strokeWeight = weight;
  }

  circle(centerX: number, centerY: number, radius: number): void {
    if (!this.ctx) return;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    if (this.doFill) {
      this.ctx.fillStyle = this.fillStyle;
      this.ctx.fill();
    }
    if (this.doStroke) {
      this.ctx.lineWidth = this.strokeWeight;
      this.ctx.strokeStyle = this.strokeStyle;
      this.ctx.stroke();
    }
  }
}
