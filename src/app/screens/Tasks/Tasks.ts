
import { Task } from "./Task";
import { TasksScreen } from "./TasksScreen";

export class Tasks {

    public screen!: TasksScreen;
    
    private taskArray: Task[] = [new Task("task 1"), new Task("task 2")];

    private yMin = -400;
    private xMin = -400;
    private yMax = 400;
    private xMax = 400;

    private loadTasks(): Task[] {
        try {
            
        } catch {
            alert('an error occurred loading tasks')
        }

        return []
    }

    public show(screen: TasksScreen): void {
        this.screen = screen;
        this.taskArray.
    }
}