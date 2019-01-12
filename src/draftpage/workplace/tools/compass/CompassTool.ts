import {BaseTool} from "../BaseTool";
import {ICompassState} from "./ICompassState";
import {NullState} from "./NullState";
import {DrawChange} from "../DrawChange";
import {Icons} from "../../../../common/components/Icons";
import {MouseEventData} from "../../MouseEventDispatcher";

class CompassTool extends BaseTool {
    public icon(): string {
        return Icons.compass();
    }

    protected _mouseDownHandler(data: MouseEventData): void {
        const newState = this._currentState.mouseDownHandler(data.relativeCors);
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
            this._reset();
        }
        this._currentState.redrawState(this._drawingContext);
    }

    protected _mouseMoveHandler(data: MouseEventData): void {
        this._currentState.mouseMoveHandler(data.relativeCors);
        this._currentState.redrawState(this._drawingContext);
    }

    protected _reset() {
        this._drawingContext.clean();
        this._currentState = new NullState();
    }

    private _currentState: ICompassState = new NullState;
}

export {CompassTool}