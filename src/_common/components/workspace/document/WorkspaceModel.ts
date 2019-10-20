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
		const documentClone = new Document(this._document.draft, this._document.markedDraft);
		const commitDocument = (document: Document) => {
			this._actionHolder.execute(new DocumentChangeAction(this._document, document));
			this._documentView.updateState(this._document);
		};
		editFn(new DocumentEditApi(documentClone, this._documentView, commitDocument))
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

	public markedDraft(): Draft {
		return this._document.markedDraft;
	}

	public draft(): Draft {
		return this._document.draft;
	}

	private _documentView: IDocumentView;
	private _document = new Document();
	private _actionHolder = new ActionHolder();
}

export {WorkspaceModel}