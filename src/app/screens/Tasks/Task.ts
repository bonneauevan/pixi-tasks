export class Task {
    private id: number;
    private task: string;
    private children: Task[];
    private parent: number;
    private complete: boolean;

    constructor(task: string){
        this.id = 0; // set with return from database on save?
        this.task = task;
        this.children = [];
        this.complete = false;
        this.parent = 0;
    }

    public getID(): number {
        return this.id;
    }

    public getChildren(): Task[] {
        return this.children;
    }

    public getParent(): number {
        return this.parent;
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

    public addChild(task: string): void {
        this.children.push(new Task(task))
    }

    public delete(): number {
        if (this.children && this.children.length > 0) {
            this.children.forEach(child => {
                child.delete();
            })
        }
        if (this.parent) {

        }
        return 0;
    }
}