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

    protected _mouseDownHandler(data: MouseEventData): void {
        this._fieldOrganizer.edit().then(api => {
            const unselectedDraft = this._fieldOrganizer.draft().remove(this._fieldOrganizer.selection());
            const selectionToAdd = unselectedDraft.getOwner(data.relativeCords);
            const selectionToRemove = this._fieldOrganizer.selection().getOwner(data.relativeCords);
            api.addSelection(selectionToAdd);
            api.removeSelection(selectionToRemove);
            api.commit();
        })
    }
}

export {SelectTool};