import {ActionHolder} from "../../../action/ActionHolder";
import {Document} from "./Document";
import {Draft} from "../../../shapes/Draft";
import {IDocumentEditApi, IWorkspaceModel} from "./IWorkspaceModel";
import {IDocumentView} from "./view/IDocumentView";
import {DocumentEditApi} from "./DocumentEditApi";
import {DocumentChangeAction} from "./actions/DocumentChangeAction";

class WorkspaceModel implements IWorkspaceModel {
	constructor(documentView: IDocumentView) {
		this._documentView = documentView;
	}

	public edit(editFn: (api: IDocumentEditApi) => void) {
		this._editPromise = this._editPromise.then(() => {
			return new Promise<void>(resolve => {
				const documentClone = new Document(this._document.draft, this._document.selection);
				const commitDocument = (document: Document) => {
					this._actionHolder.execute(new DocumentChangeAction(this._document, document));
					this._documentView.updateState(this._document);
					resolve();
				};
				editFn(new DocumentEditApi(documentClone, this._documentView, commitDocument, resolve))
			})
		})
	}

	public undo() {
		this._actionHolder.undo();
		this._documentView.updateState(this._document);
	}

	public redo() {
		this._actionHolder.redo();
		this._documentView.updateState(this._document);
	}

	public cleanDocument() {
		this._document = new Document();
		this._actionHolder = new ActionHolder();
	}

	public selection(): Draft {
		return this._document.selection;
	}

	public draft(): Draft {
		return this._document.draft;
	}

	private _documentView: IDocumentView;
	private _document = new Document();
	private _editPromise = Promise.resolve();
	private _actionHolder = new ActionHolder();
}

export {WorkspaceModel}