import { Sprite, Text, Texture } from "pixi.js";
import { Task } from "./Task";

export class TaskBubble extends Sprite {
  public xTarget: number;
  public yTarget: number;
  public task: Task;
  private text: Text

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

  public constructor(task: Task, x: number = 0, y: number = 0) {
      super({ texture: Texture.from("task.svg"), anchor: 0.5, scale: 0.5 });
      this.task = task;
      this.x = this.xTarget = x;
      this.y = this.yTarget = y;
      this.eventMode = 'static';
      this.text = new Text({
        text: this.task.getTask(),
        style: {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0xffffff, // White color
            align: 'center'
        }
      });
      this.addChild(this.text);
      this.on('pointerenter', () => {
        this.scale.set(0.55);
      });
      this.on('pointerleave', () => {
        this.scale.set(0.5);
      });
      this.on('pointertap', () => {
        this.scale.set(0.75);
        this.texture = Texture.from('task_highlight.svg');
        this.setTarget(0,0)
      });
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