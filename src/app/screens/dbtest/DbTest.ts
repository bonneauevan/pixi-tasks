import { FancyButton } from "@pixi/ui";
import { animate } from "motion";
import type { AnimationPlaybackControls } from "motion/react";
import { Container } from "pixi.js";
import { Button } from "../../ui/Button";


export class DbTest extends Container {
    public static assetBundles = ["tasks", "main"];

    private mainContainer: Container;
    private saveButton: FancyButton;
    private tasks: Tasks;

    constructor() {
        super();

        this.mainContainer = new Container();
        this.addChild(this.mainContainer);

        this.saveButton = new Button({
              text: "Save",
              width: 175,
              height: 110,
            });
        this.saveButton.onPress.connect(() => {
            window.alert("Hello")
        })
        this.addChild(this.saveButton)
    }


    public prepare() {}

    public update() {}

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
    }

  /** Hide screen with animations */
  public async hide() {}

  /** Auto pause the app when window go out of focus */
  public blur() {}

}