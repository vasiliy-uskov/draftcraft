import {Component} from "../../common/components/component/Component";
import {TagsName} from "../../common/components/TagsName";
import {CanvasDrawingContext} from "./drawingcontext/CanvasDrawingContext";
import {IDrawingContext} from "./drawingcontext/IDrawingContext";
import {MouseEventDispatcher} from "./MouseEventDispatcher";
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
        const {context: resultsCanvasContext} = this._createCanvas("results-canvas");
        this._resultsCanvasContext = resultsCanvasContext;
        const {context: workingCanvasContext, canvas: workingCanvas} = this._createCanvas("working-canvas");
        this._workingCanvasContext = workingCanvasContext;
        this._canvasMouseEventDispatcher = new MouseEventDispatcher(workingCanvas);
        this._addDisposable(this._canvasMouseEventDispatcher);

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

    private _createCanvas(elementName: string): {context: IDrawingContext, canvas: Component} {
        const canvas = new Component({
            tagName: TagsName.canvas,
            bemInfo: this.createChildBemInfo(elementName),
        });
        this.addChild(canvas);
        const canvasElement = canvas.element() as HTMLCanvasElement;
        const canvasResizeObserver = new ResizeObserver(canvas);
        this._addDisposable(canvasResizeObserver);
        this._addHandler(canvasResizeObserver.resizeEvent(), () => {
            requestAnimationFrame(() => {
                const canvasRect = canvasElement.getBoundingClientRect();
                canvasElement.width = canvasRect.width;
                canvasElement.height = canvasRect.height;
            })
        });
        return {context: new CanvasDrawingContext(canvasElement), canvas};
    }

    private _background: Component;
    private _resultsCanvasContext: IDrawingContext;
    private _workingCanvasContext: IDrawingContext;
    private _canvasMouseEventDispatcher: MouseEventDispatcher;
}

export {Workplace};