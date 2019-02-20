import {Draft} from "../../../../shapes/Draft";

interface IFieldView {
    updateState(draft: Draft, selection: Draft): void;
}

export {IFieldView};