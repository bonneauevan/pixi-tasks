export class Task {
    private id: number;
    private task: string;
    private children: Task[];
    private parent: number;
    private complete: boolean;

    constructor(task: string, parentId: number = 0){
        this.id = Math.floor(Math.random() * (100 - 1)) + 1; // update from zero when saving maybe?
        this.task = task;
        this.children = [];
        this.complete = false;
        this.parent = parentId;
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

    public addChild(task: Task): void {
        this.children.push(task);
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