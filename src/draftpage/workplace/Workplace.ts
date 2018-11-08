import {Component} from "../../common/components/component/Component";
import {TagsName} from "../../common/components/TagsName";
import {CanvasDrawingContext} from "./CanvasDrawingContext";
import {IDrawingContext} from "./IDrawingContext";
import {MouseEventDispatcher} from "./MouseEventDispatcher";
import {Size} from "../../common/utils/Size";
import {ResizeObserver} from "../../common/utils/ResizeObserver";

class Workplace extends Component {
    constructor() {
        super({
            blockName: "workplace",
        });

        this._background = new Component({
            tagName: TagsName.img,
            bemInfo: this.createChildBemInfo("background"),
        });
        this.addChild(this._background);
        this._resultsCanvasContext = this._createCanvas("results-canvas");
        this._workingCanvasContext = this._createCanvas("working-canvas", (canvas: Component) => {
            this._canvasMouseEventDispatcher = new MouseEventDispatcher(canvas);
            this._addDisposable(this._canvasMouseEventDispatcher);
        });
    }

    public resultsCanvasContext(): IDrawingContext {
        return this._resultsCanvasContext;
    }

    public workingCanvasContext(): IDrawingContext {
        return this._workingCanvasContext;
    }

    public canvasMouseEventDispatcher(): MouseEventDispatcher {
        return this._canvasMouseEventDispatcher;
    }

    public setBackgroundImage(src: string): void {
        this._background.setAttribute("src", src);
    }

    _createCanvas(elementName: string, canvasCreationHandler?: (canvas: Component) => void): IDrawingContext {
        const canvas = new Component({
            tagName: TagsName.canvas,
            bemInfo: this.createChildBemInfo(elementName),
        });
        this.addChild(canvas);
        const canvasElement = canvas.element() as HTMLCanvasElement;
        if (canvasCreationHandler) {
            canvasCreationHandler(canvas);
        }
        const canvasResizeObserver = new ResizeObserver(canvas);
        this._addDisposable(canvasResizeObserver);
        this._addHandler(canvasResizeObserver.resizeEvent(), () => {
            requestAnimationFrame(() => {
                const canvasRect = canvasElement.getBoundingClientRect();
                canvasElement.width = canvasRect.width;
                canvasElement.height = canvasRect.height;
            })
        });
        return new CanvasDrawingContext(canvasElement);
    }

    private _background: Component;
    private _resultsCanvasContext: IDrawingContext;
    private _workingCanvasContext: IDrawingContext;
    private _canvasMouseEventDispatcher: MouseEventDispatcher;
}

export {Workplace};