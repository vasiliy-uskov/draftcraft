import {ICompassState} from "./ICompassState";
import {Icons} from "../../../Icons";
import {MouseEventData} from "../../MouseEventDispatcher";
import {BaseTool} from "../BaseTool";
import {GetCenterState} from "./GetCenterState";
import {reducePoint} from "../../../../utils/mathutils";

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
		relativeCords = this._needToReducePoints()
			? reducePoint(this._workspace.draft().controlPoints, relativeCords)
			: relativeCords;
		this._currentState.addPoint(relativeCords);
		if (this._currentState.result()) {
			const arc = this._currentState.result();
			this._workspace.edit(api => api.addDraft(arc.draft()).commit());
		}
		this._currentState = this._currentState.getNextState();
	}

	protected _mouseMoveHandler({relativeCords}: MouseEventData): void {
		this._currentState.addPoint(reducePoint(
			this._workspace.draft().controlPoints,
			relativeCords
		));
	}

	private _currentState: ICompassState = new GetCenterState(this._drawingContext);
}

export {CompassTool}