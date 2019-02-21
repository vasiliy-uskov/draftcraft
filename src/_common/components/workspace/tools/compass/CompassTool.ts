import {ICompassState} from "./ICompassState";
import {Icons} from "../../../Icons";
import {MouseEventData} from "../../MouseEventDispatcher";
import {BaseTool} from "../BaseTool";
import {GetCenterState} from "./GetCenterState";

class CompassTool extends BaseTool {

    public cursor(): string {
        return "crosshair";
    }

    public icon(): string {
        return Icons.compass();
    }

    public reset() {
        this._currentState = new GetCenterState(this._drawingContext);
        this._drawingContext.clean();
    }

    protected _mouseDownHandler({relativeCords}: MouseEventData): void {
        this._currentState.addPoint(relativeCords);
        if (this._currentState.result()) {
            const arc = this._currentState.result();
            this._documentOrganizer.edit(api => api.addDraft(arc.draft()).commit());
        }
        this._currentState = this._currentState.getNextState();
    }

    protected _mouseMoveHandler({relativeCords}: MouseEventData): void {
        this._currentState.addPoint(relativeCords);
    }

    private _currentState: ICompassState = new GetCenterState(this._drawingContext);
}

export {CompassTool}