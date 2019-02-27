import {BaseTool} from "../BaseTool";
import {MouseEventData} from "../../MouseEventDispatcher";
import {Icons} from "../../../Icons";

class SelectTool extends BaseTool {
    public icon(): string {
        return Icons.select();
    }

    public cursor(): string {
        return "pointer";
    }

    protected _mouseDownHandler({relativeCords}: MouseEventData): void {
        this._workspace.edit(api => {
            const unselectedDraft = this._workspace.draft().remove(this._workspace.selection());
            const selectionToAdd = unselectedDraft.getOwner(relativeCords);
            const selectionToRemove = this._workspace.selection().getOwner(relativeCords);
            api
                .addSelection(selectionToAdd)
                .removeSelection(selectionToRemove)
                .commit();
        })
    }
}

export {SelectTool};