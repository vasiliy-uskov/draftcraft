import {BaseTool} from "../BaseTool";
import {ICompassState} from "./ICompassState";
import {NullState} from "./NullState";
import {DrawChange} from "../DrawChange";

class CompassTool extends BaseTool {
    protected _mouseDownHandler(event: MouseEvent): void {
        const newState = this._currentState.mouseDownHandler(this._getMouseCord(event));
        if (newState) {
            this._currentState = newState;
        }
        else {
            const arc = this._currentState.arc();
            if (!arc) {
                throw new Error("Invalid result tool for compass");
            }
            const change = new DrawChange(arc);
            this._dispatchChangeEvent(change);
            this._currentState = new NullState();
        }
        this._currentState.redrawState(this._drawingContext);
    }

    protected _mouseMoveHandler(event: MouseEvent): void {
        this._currentState.mouseMoveHandler(this._getMouseCord(event));
        this._currentState.redrawState(this._drawingContext);
    }

    private _currentState: ICompassState = new NullState;
}

export {CompassTool}