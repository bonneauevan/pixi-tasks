import { FancyButton } from "@pixi/ui";
import { animate } from "motion";
import type { AnimationPlaybackControls } from "motion/react";
import { Container, Ticker } from "pixi.js";
import { Button } from "../../ui/Button";
import { Tasks } from "./Tasks";
import { TaskBubble } from "./TaskBubble";


export class TasksScreen extends Container {
    public static assetBundles = ["default", "main"];

    public mainContainer: Container;
    private saveButton: FancyButton;
    private tasks: Tasks;

    constructor() {
        super();

        this.mainContainer = new Container();
        this.addChild(this.mainContainer);
        this.tasks = new Tasks();

        this.saveButton = new Button({
              text: "Save",
              width: 175,
              height: 110,
            });
        this.saveButton.onPress.connect(() => {
            this.tasks.testSwap()
        })
        this.addChild(this.saveButton)

    }


    public prepare() {}

    public update(_time: Ticker) {
        this.tasks.update();
    }

      /** Fully reset */
    public reset() {}

     /** Resize the screen, fired whenever window size changes */
  public resize(width: number, height: number) {
    const centerX = width * 0.5;
    const centerY = height * 0.5;

    this.mainContainer.x = centerX;
    this.mainContainer.y = centerY;
    this.saveButton.x = centerX;
    this.saveButton.y = centerY;

    this.saveButton.x = width - 80;
    this.saveButton.y = 50;
  }


    public async show(): Promise<void> {

        const elementsToAnimate = [
            this.saveButton,
        ];
        
        let finalPromise!: AnimationPlaybackControls;
        for (const element of elementsToAnimate) {
            element.alpha = 0;
            finalPromise = animate(
                element,
                { alpha: 1 },
                { duration: 0.3, delay: 0.75, ease: "backOut" },
            );
        }
        
        await finalPromise;
        this.tasks.show(this);
    }

  /** Hide screen with animations */
  public async hide() {}

  /** Auto pause the app when window go out of focus */
  public blur() {}

}