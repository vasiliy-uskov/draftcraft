import {Draft} from "../../../shapes/Draft";
import {Document} from "./Document";
import {IDocumentEditApi} from "./IDocumentOrganizer";

class DocumentEditApi implements IDocumentEditApi {
    constructor(document: Document, resolve: (document: Document) => void) {
        this._resolve = resolve;
        this._document = document
    }

    public addDraft(draft: Draft) {
        this._document.draft = this._document.draft.add(draft);
        return this;
    }

    public removeDraft(draft: Draft) {
        this._document.draft = this._document.draft.remove(draft);
        this._document.selection = this._document.selection.remove(draft);
        return this;
    }

    public addSelection(draft: Draft) {
        this._document.selection = this._document.selection.add(draft);
        return this;
    }

    public removeSelection(draft: Draft) {
        this._document.selection = this._document.selection.remove(draft);
        return this;
    }

    public draft(): Draft {
        return this._document.draft
    }

    public selection(): Draft {
        return this._document.selection;
    }

    public commit() {
        this._resolve(this._document);
    }

    private _document: Document;
    private _resolve: (document: Document) => void;
}

export {DocumentEditApi};