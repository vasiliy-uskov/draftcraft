import {Draft} from "../../../shapes/Draft";

interface IDocumentEditApi {
    addDraft(draft: Draft): void;
    removeDraft(draft: Draft): void;
    addSelection(draft: Draft): void;
    removeSelection(draft: Draft): void;
    draft(): Draft;
    selection(): Draft;
    commit(): void;
}

interface IDocumentOrganizer {
    edit(): Promise<IDocumentEditApi>;
    selection(): Draft;
    draft(): Draft;
}

export {IDocumentOrganizer, IDocumentEditApi}