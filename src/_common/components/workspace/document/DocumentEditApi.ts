import {Draft} from "../../../shapes/Draft";
import {Document} from "./Document";
import {IDocumentEditApi} from "./IWorkspaceModel";
import {IDocumentView} from "./view/IDocumentView";

class DocumentEditApi implements IDocumentEditApi {
	constructor(document: Document, documentView: IDocumentView, commit: (document: Document) => void) {
		this._commit = commit;
		this._document = document;
		this._documentView = documentView;
	}


	public addDraft(draft: Draft): DocumentEditApi {
		this._document.draft = this._document.draft.add(draft);
		return this;
	}

	public removeDraft(draft: Draft): DocumentEditApi {
		this._document.draft = this._document.draft.remove(draft);
		this._document.selection = this._document.selection.remove(draft);
		return this;
	}

	public addSelection(draft: Draft): DocumentEditApi {
		this._document.selection = this._document.selection.add(draft);
		return this;
	}

	public removeSelection(draft: Draft): DocumentEditApi {
		this._document.selection = this._document.selection.remove(draft);
		return this;
	}

	public updateView(): DocumentEditApi {
		this._documentView.updateState(this._document);
		return this;
	}

	public draft(): Draft {
		return this._document.draft
	}

	public selection(): Draft {
		return this._document.selection;
	}

	public commit() {
		if (this._finished) {
			return;
		}
		this._commit(this._document);
		this._finished = true;
	}

	public reset() {
		if (this._finished) {
			return;
		}
		this._finished = true;
	}

	private _documentView: IDocumentView;
	private _document: Document;
	private _commit: (document: Document) => void;
	private _finished = false;
}

export {DocumentEditApi};