import {Draft} from "../../../../shapes/Draft";

interface IDocumentView {
    updateState(draft: Draft, selection: Draft): void;
}

export {IDocumentView};