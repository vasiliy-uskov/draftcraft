import {Draft} from "../../../shapes/Draft";

interface IFieldOrganizer {
    addDraft(draft: Draft): void;
    removeDraft(draft: Draft): void;
    addSelection(draft: Draft): void
    removeSelection(draft: Draft): void;
    selection(): Draft;
    draft(): Draft;
}

export {IFieldOrganizer}