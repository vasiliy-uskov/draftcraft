import {ActionHolder} from "../../../action/ActionHolder";
import {Document} from "./Document";
import {Draft} from "../../../shapes/Draft";
import {IDocumentOrganizer} from "./IDocumentOrganizer";
import {IDocumentView} from "./view/IDocumentView";
import {DocumentEditApi} from "./DocumentEditApi";
import {DocumentChangeAction} from "./actions/DocumentChangeAction";

class DocumentOrganizer implements IDocumentOrganizer {
    constructor(documentView: IDocumentView) {
        this._documentView = documentView;
    }

    public edit(): Promise<DocumentEditApi> {
        let documentPromise: Promise<Document>;
        let apiPromise = this._editPromise.then(() => {
            let resolve: (f: Document) => void;
            documentPromise = new Promise<Document>((res) => {
                resolve = res;
            });
            return new DocumentEditApi(new Document(this._document.draft, this._document.selection), resolve)
        });
        this._editPromise = apiPromise.then(() => {
            documentPromise.then((document) => {
                this._actionHolder.execute(new DocumentChangeAction(this._document, document));
                this._documentView.updateState(this._document.draft, this._document.selection);
            })
        });
        return apiPromise;
    }

    public undo() {
        this._actionHolder.undo();
        this._documentView.updateState(this._document.draft, this._document.selection);
    }

    public redo() {
        this._actionHolder.redo();
        this._documentView.updateState(this._document.draft, this._document.selection);
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
    private _editPromise: Promise<void> = Promise.resolve();
    private _actionHolder = new ActionHolder();
}

export {DocumentOrganizer}