import { Sprite, Text, Texture } from "pixi.js";
import { TasksScreen } from "./TasksScreen";

export class Task extends Sprite  {
    private id: number;
    private task: string;
    private childTasks: Task[];
    private parentTask: number;
    private complete: boolean;
    public xTarget: number;
    public yTarget: number;
    private text: Text;
    private screen: TasksScreen;
    private moveSpeed: number = 0.1;

    constructor(task: string, parentId: number = 0, screen: TasksScreen, x: number = 0, y: number = 0){
        super({ texture: Texture.from("task.svg"), anchor: 0.5, scale: 0.5 });
        this.id = Math.floor(Math.random() * (100 - 1)) + 1; // update from zero when saving maybe?
        this.task = task;
        this.childTasks = [];
        this.complete = false;
        this.parentTask = parentId;
        this.task = task;
        this.screen = screen;
        this.x = this.xTarget = x;
        this.y = this.yTarget = y;
        this.eventMode = 'static';
        this.text = new Text({
          text: this.task,
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
          this.screen.setSelected(this);
          this.screen.updateTasks();
        });
    }

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

    public getID(): number {
        return this.id;
    }

    public getChildren(): Task[] {
        return this.childTasks;
    }

    public getParent(): number {
        return this.parentTask;
    }

    public getStatus(): boolean {
        return this.complete;
    }

    public getTask(): string {
        return this.task;
    }

    public setTask(task: string): void {
        this.task = task;
    }

    public addChildTask(task: Task): void {
        this.children.push(task);
    }

    public deleteTask(): number {
        if (this.childTasks && this.childTasks.length > 0) {
            this.childTasks.forEach(c => {
                c.deleteTask();
            })
        }
        if (this.parent) {

        }
        return 0;
    }
}