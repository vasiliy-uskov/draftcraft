import {Document} from "../Document";
import {Draft} from "../../../../shapes/Draft";

class DocumentChangeAction implements IAction {
	constructor(document: Document, newDocument: Document) {
		this._document = document;
		this._newDocument = newDocument;
		this._oldDraft = this._document.draft;
		this._oldMarkedDraft = this._document.markedDraft;
	}

	public execute(): void {
		this._document.draft = this._newDocument.draft;
		this._document.markedDraft = this._newDocument.markedDraft;
	}

	public unexecute(): void {
		this._document.draft = this._oldDraft;
		this._document.markedDraft = this._oldMarkedDraft;
	}

	private readonly _document: Document;
	private readonly _newDocument: Document;
	private readonly _oldDraft: Draft;
	private readonly _oldMarkedDraft: Draft;
}

export {DocumentChangeAction}