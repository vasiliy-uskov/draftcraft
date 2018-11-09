import {BaseTool} from "../BaseTool";
import {DrawChange} from "../DrawChange";
import {CleanArea} from "./CleanArea";

class EraserTool extends BaseTool {
    protected _mouseDownHandler(event: MouseEvent): void {
        this._active = true;
    }

    protected _mouseMoveHandler(event: MouseEvent): void {
        if (this._active) {
            const shape = new CleanArea(this._getMouseCord(event));
            this._dispatchChangeEvent(new DrawChange(shape));
        }
    }

    protected _mouseUpHandler(event: MouseEvent): void {
        this._active = false;
    }

    private _active: boolean = false;
}

export {EraserTool}