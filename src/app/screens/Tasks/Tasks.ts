
import { animate } from "motion";
import { Task } from "./Task";
import { TaskBubble } from "./TaskBubble";
import { TasksScreen } from "./TasksScreen";
import { waitFor } from "../../../engine/utils/waitFor";

export class Tasks {
    private static readonly ANIMATION_DURATION = 1;
    private static readonly WAIT_DURATION = 0.5;
    
    public screen!: TasksScreen;
    
    private taskArray: Task[] = [];
    private taskBubbleArray: TaskBubble[] = [];

    private yMin = -400;
    private xMin = -400;
    private yMax = 400;
    private xMax = 400;

    public addTask(task: string): void {
        const taskBubble = new TaskBubble(new Task(task));
        taskBubble.alpha = 0;
        taskBubble.position.set(taskBubble.x, taskBubble.y);
        animate(taskBubble, { alpha: 1 }, { duration: Tasks.ANIMATION_DURATION });
        this.screen.mainContainer.addChild(taskBubble);
        this.taskBubbleArray.push(taskBubble);
        this.updateTargets();
    }

    public async show(screen: TasksScreen): Promise<void> {
        this.screen = screen;
        this.taskArray.forEach(async t => {
            await waitFor(Tasks.WAIT_DURATION);
        })
    }

    public update(): void {
        this.taskBubbleArray.forEach(tb => {
            tb.update();
        })
    }

    public resize(w: number, h: number): void {
        this.xMin = -w / 2;
        this.xMax = w / 2;
        this.yMin = -h / 2;
        this.yMax = h / 2;
    }

    public testSwap(): void {
        this.taskBubbleArray.forEach(tb => {
            tb.setTarget(400 - tb.xTarget, tb.yTarget)
        })
    }

    private updateTargets(): void {
        const numBubbles = this.taskBubbleArray.length;
        const angle = (2*Math.PI) / numBubbles;
        let count = 0;
        this.taskBubbleArray.forEach(tb => {
            const x_n = Math.cos(angle * count);
            const y_n = Math.sin(angle * count);
            tb.setTarget(this.xMax * x_n, this.yMax * y_n)
            count++;
        })
    }
}