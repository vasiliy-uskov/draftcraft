import {Component, ConnectionHandlers} from "../component/Component";
import {BemInfo} from "../component/BemInfo";
import {CanvasDrawingContext} from "./CanvasDrawingContext";
import {TagsName} from "../component/TagsName";
import {ResizeObserver} from "../../utils/ResizeObserver";

class Canvas extends Component {
    constructor(config: {
        baseElement?: HTMLCanvasElement,
        blockName?: string,
        bemInfo?: BemInfo,
        connectionHandlers?: ConnectionHandlers
    }) {
        super({
            ...config,
            tagName: TagsName.canvas,
        });
        const canvasResizeObserver = new ResizeObserver(this);
        this._addDisposable(canvasResizeObserver);
        this._addHandler(canvasResizeObserver.resizeEvent(), () => {
            requestAnimationFrame(() => {
                const canvasRect = this.getClientRect();
                this.element().width = canvasRect.width;
                this.element().height = canvasRect.height;
            })
        });
    }

    public element(): HTMLCanvasElement {
        return super.element() as HTMLCanvasElement;
    }

    public context(): CanvasDrawingContext {
        return this._context;
    }

    private _context = new CanvasDrawingContext(this.element());
}

export {Canvas}