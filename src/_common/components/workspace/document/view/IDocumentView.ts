import {Document} from "../Document";

interface IDocumentView {
	updateState(document: Readonly<Document>): void;
}

export {IDocumentView};