import {BaseTool} from "../BaseTool";
import {MouseEventData} from "../../../workspace/MouseEventDispatcher";

class MarkTool extends BaseTool {
	protected _mouseDownHandler({relativeCords}: MouseEventData): void {
		this._workspace.edit(api => {
			const unselectedDraft = this._workspace.draft().remove(this._workspace.markedDraft());
			const selectionToAdd = unselectedDraft.getOwner(relativeCords);
			const selectionToRemove = this._workspace.markedDraft().getOwner(relativeCords);
			api
				.markDraft(selectionToAdd)
				.unmarkDraft(selectionToRemove)
				.commit();
		})
	}
}

export {MarkTool};