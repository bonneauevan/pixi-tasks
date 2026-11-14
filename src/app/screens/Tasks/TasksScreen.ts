import { FancyButton, Input } from "@pixi/ui";
import { animate } from "motion";
import type { AnimationPlaybackControls } from "motion/react";
import { Container, Sprite, Ticker } from "pixi.js";
import { Button } from "../../ui/Button";
import { Tasks } from "./Tasks";


export class TasksScreen extends Container {
    public static assetBundles = ["default", "main"];

    public mainContainer: Container;
    private swapButton: FancyButton;
    private addButton: FancyButton;
    private tasks: Tasks;
    private textInput: Input;

    constructor() {
        super();

        this.mainContainer = new Container();
        this.addChild(this.mainContainer);
        this.tasks = new Tasks();

        this.swapButton = new Button({
              text: "Swap",
              width: 175,
              height: 110,
            });
        this.swapButton.onPress.connect(() => {
            this.tasks.testSwap()
        })
        this.addChild(this.swapButton)

        this.addButton = new Button({
              text: "Add",
              width: 175,
              height: 110,
            });
        this.addButton.onPress.connect(() => {
            if (this.textInput.value !== '') {
              this.tasks.addTask(this.textInput.value)
              this.textInput.value = '';
            }
        })
        this.addChild(this.addButton)

        this.textInput = new Input({
          bg: Sprite.from('input.svg'),
          placeholder: 'New parent task',
          scale: 0.5,
          padding: {
            top: 11,
            right: 11,
            bottom: 11,
            left: 11
          },
        });
        this.addChild(this.textInput);
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
    this.swapButton.x = centerX;
    this.swapButton.y = centerY;

    this.swapButton.x = width - this.swapButton.width/2;
    this.swapButton.y = this.swapButton.height/2;

    this.addButton.x = this.addButton.width/2;
    this.addButton.y = this.addButton.height/2;

    this.textInput.x = width/2 - this.textInput.width/2;
    this.textInput.y = this.textInput.height/2;
  }


    public async show(): Promise<void> {

        const elementsToAnimate = [
            this.swapButton,
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