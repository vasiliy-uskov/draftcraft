import {BaseTool} from "../BaseTool";
import {MouseEventData} from "../../../workspace/MouseEventDispatcher";
import {Vec2} from "../../../../utils/Vec2";
import {MoveSession} from "./MoveSession";

class MoveTool extends BaseTool {
	public reset(): void {
		if (this._moveSession) {
			this._moveSession.reset();
			this._moveSession = null;
		}
	}

	protected _mouseMoveHandler({relativeCords}: MouseEventData): void {
		if (!this._prevCords) {
			return;
		}
		if (this._moveSession) {
			const offsetVector = relativeCords.reduce(this._prevCords);
			this._moveSession.move(offsetVector);
		}
		this._prevCords = relativeCords;
	}

	protected _mouseDownHandler({relativeCords}: MouseEventData): void {
		this._prevCords = relativeCords;
		this._workspace.edit(documentApi => {
			if (this._moveSession) {
				this._moveSession.reset();
			}
			this._moveSession = new MoveSession({
				documentApi,
				drawingContext: this._drawingContext,
				selectedDraft: this._workspace.markedDraft()
			})
		})
	}

	protected _mouseUpHandler(): void {
		if (this._moveSession) {
			this._moveSession.commit();
			this._moveSession = null;
		}
	}

	private _moveSession?: MoveSession;
	private _prevCords: Vec2 = null;
}

export {MoveTool};