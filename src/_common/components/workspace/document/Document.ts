import {Draft} from "../../../shapes/Draft";

class Document {
    constructor(draft: Draft = Draft.create(), selection: Draft = Draft.create()) {
        this.draft = draft;
        this.selection = selection;
    }

    public selection: Draft;
    public draft: Draft;
}

export {Document}