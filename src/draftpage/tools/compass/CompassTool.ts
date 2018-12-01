import {BaseTool} from "../BaseTool";
import {ICompassState} from "./ICompassState";
import {NullState} from "./NullState";
import {verify} from "../../../common/utils/typetools";
import {DrawChange} from "../DrawChange";

class CompassTool extends BaseTool {
    protected _mouseDownHandler(event: MouseEvent): void {
        const newState = this._currentState.mouseDownHandler(this._getMouseCord(event));
        if (newState) {
            this._currentState = newState;
        }
        else {
            const change = new DrawChange(verify(this._currentState.arc()));
            this._dispatchChangeEvent(change);
            this._currentState = new NullState();
        }
        this._currentState.redrawState(this._drawingContext);
    }

    protected _mouseMoveHandler(event: MouseEvent): void {
        this._currentState.mouseMoveHandler(this._getMouseCord(event));
        this._currentState.redrawState(this._drawingContext);
    }

    protected _mouseUpHandler(event: MouseEvent): void {}

    private _currentState: ICompassState = new NullState;
}

export {CompassTool}