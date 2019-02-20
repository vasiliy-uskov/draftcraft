import {Component, ConnectionHandlers} from "../component/Component";
import {BemInfo} from "../component/BemInfo";
import {CanvasDrawingContext} from "./CanvasDrawingContext";

class Canvas extends Component {
    constructor(config: {
        baseElement?: HTMLCanvasElement,
        blockName?: string,
        bemInfo?: BemInfo,
        connectionHandlers?: ConnectionHandlers
    }) {
        super(config);
    }

    public setWidth(width: number) {
        this.element().width = width;
    }

    public setHeight(height: number) {
        this.element().height = height;
    }

    public width(): number {
        return this.element().width;
    }

    public height(): number {
        return this.element().height;
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