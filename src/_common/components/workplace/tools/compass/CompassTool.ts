import {DrawTool} from "../DrawTool";
import {ICompassState} from "./ICompassState";
import {NullState} from "./NullState";
import {Icons} from "../../../Icons";
import {MouseEventData} from "../../MouseEventDispatcher";

class CompassTool extends DrawTool {
    public icon(): string {
        return Icons.compass();
    }

    public reset() {
        this._currentState = new NullState();
        this._drawingContext.clean();
    }

    protected _mouseDownHandler(data: MouseEventData): void {
        const newState = this._currentState.mouseDownHandler(data.relativeCords);
        if (newState) {
            this._currentState = newState;
        }
        else {
            const arc = this._currentState.arc();
            if (!arc) {
                throw new Error("Invalid result tool for compass");
            }
            this._dispatchAddShapeEvent(arc);
            this.reset();
        }
        this._currentState.redrawState(this._drawingContext);
    }

    protected _mouseMoveHandler(data: MouseEventData): void {
        this._currentState.mouseMoveHandler(data.relativeCords);
        this._currentState.redrawState(this._drawingContext);
    }

    private _currentState: ICompassState = new NullState;
}

export {CompassTool}