import {Draft} from "../../../shapes/Draft";

interface IFieldEditApi {
    addDraft(draft: Draft): void;
    removeDraft(draft: Draft): void;
    addSelection(draft: Draft): void;
    removeSelection(draft: Draft): void;
    draft(): Draft;
    selection(): Draft;
    commit(): void;
}

interface IFieldOrganizer {
    edit(): Promise<IFieldEditApi>;
    selection(): Draft;
    draft(): Draft;
}

export {IFieldOrganizer, IFieldEditApi}