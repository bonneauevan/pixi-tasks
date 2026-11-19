
import { animate } from "motion";
import { Task } from "./Task";
import { TasksScreen } from "./TasksScreen";
import { waitFor } from "../../../engine/utils/waitFor";

export class Tasks {
    private static readonly ANIMATION_DURATION = 1;
    private static readonly WAIT_DURATION = 0.5;
    
    public screen!: TasksScreen;
    
    private parentTaskArray: Task[] = [];
    private allTaskArray: Task[] = [];

    private yMin = -400;
    private xMin = -400;
    private yMax = 400;
    private xMax = 400;

    public addTask(task: string, parentId: number = 0): void {
        const newTask = new Task(task, parentId, this.screen);
        newTask.alpha = 0;
        newTask.position.set(newTask.x, newTask.y);
        animate(newTask, { alpha: 1 }, { duration: Tasks.ANIMATION_DURATION });
        this.screen.mainContainer.addChild(newTask);
        this.allTaskArray.push(newTask);
        this.updateTargets();
        this.screen.updateTasks();
        if (parentId) {
            this.parentTaskArray.find((t) => t.getID() === parentId)?.addChild(newTask);
        } else {
            this.parentTaskArray.push(newTask);
        }
    }

    public async show(screen: TasksScreen): Promise<void> {
        this.screen = screen;
        this.parentTaskArray.forEach(async t => {
            await waitFor(Tasks.WAIT_DURATION);
        })
    }

    public update(): void {
        this.allTaskArray.forEach(tb => {
            tb.update();
        })
        this.screen.setSelectedTargets(0,0);
    }

    public resize(w: number, h: number): void {
        this.xMin = -w / 2;
        this.xMax = w / 2;
        this.yMin = -h / 2;
        this.yMax = h / 2;
    }

    public testSwap(): void {
        this.allTaskArray.forEach(tb => {
            tb.setTarget(400 - tb.xTarget, tb.yTarget)
        })
    }

    public updateTargets(): void {
        const numBubbles = this.allTaskArray.length;
        const angle = (2*Math.PI) / numBubbles;
        let count = 0;
        this.allTaskArray.forEach(tb => {
            const x_n = Math.cos(angle * count);
            const y_n = Math.sin(angle * count);
            tb.setTarget(this.xMax * x_n, this.yMax * y_n)
            count++;
        })
        this.screen.setSelectedTargets(0,0)
    }
}