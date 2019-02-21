import {Draft} from "../../../shapes/Draft";

interface IDocumentEditApi {
    addDraft(draft: Draft): IDocumentEditApi;
    removeDraft(draft: Draft): IDocumentEditApi;
    addSelection(draft: Draft): IDocumentEditApi;
    removeSelection(draft: Draft): IDocumentEditApi;
    draft(): Draft;
    selection(): Draft;
    commit(): void;
}

interface IDocumentOrganizer {
    edit(editFn: (api: IDocumentEditApi) => void): void;
    selection(): Draft;
    draft(): Draft;
}

export {IDocumentOrganizer, IDocumentEditApi}