import { Sprite, Texture } from "pixi.js";

export class TaskBubble extends Sprite {
  public xTarget: number;
  public yTarget: number;

  private moveSpeed: number = 0.1;

  get left() {
    return -this.width * 0.5;
  }

  get right() {
    return this.width * 0.5;
  }

  get top() {
    return -this.height * 0.5;
  }

  get bottom() {
    return this.height * 0.5;
  }

  public constructor(x: number = 0, y: number = 0) {
      super({ texture: Texture.from("task.svg"), anchor: 0.5, scale: 1 });
      this.x = this.xTarget = x;
      this.y = this.yTarget = y;
  }

  public setTarget(x: number, y: number) {
    this.xTarget = x;
    this.yTarget = y;
  }

  public update(): void {
    // if not where it needs to be, move it towards target
    if (this.x !== this.xTarget) {
        const xdiff = Math.abs(this.x - this.xTarget);
        if (this.x > this.xTarget) {
            this.x = this.x - Math.ceil(xdiff * this.moveSpeed);
        } else {
            this.x = this.x + Math.ceil(xdiff * this.moveSpeed);
        }
    }
    if (this.y !== this.yTarget) {
        const ydiff = Math.abs(this.y - this.yTarget);
        if (this.y > this.yTarget) {
            this.y = this.y - Math.ceil(ydiff * this.moveSpeed);
        } else {
            this.y = this.y + Math.ceil(ydiff * this.moveSpeed);
        }
    }
  }
}