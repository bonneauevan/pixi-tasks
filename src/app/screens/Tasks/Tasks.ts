
import { animate } from "motion";
import { Task } from "./Task";
import { TaskBubble } from "./TaskBubble";
import { TasksScreen } from "./TasksScreen";
import { waitFor } from "../../../engine/utils/waitFor";

export class Tasks {
    private static readonly ANIMATION_DURATION = 1;
    private static readonly WAIT_DURATION = 0.5;
    
    public screen!: TasksScreen;
    
    private taskArray: Task[] = [new Task("task 1")];
    private taskBubbleArray: TaskBubble[] = [];
    private taskCount: number = this.taskArray.length;

    private yMin = -400;
    private xMin = -400;
    private yMax = 400;
    private xMax = 400;

    public addTask(){
        const taskBubble = new TaskBubble();
        taskBubble.alpha = 0;
        taskBubble.position.set(taskBubble.x, taskBubble.y);
        animate(taskBubble, { alpha: 1 }, { duration: Tasks.ANIMATION_DURATION });
        this.screen.mainContainer.addChild(taskBubble);
        this.taskBubbleArray.push(taskBubble);
    }

    public async show(screen: TasksScreen): Promise<void> {
        this.screen = screen;
        let n = 0;
        this.taskArray.forEach(async t => {
            this.addTask();
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
}