import {Draft} from "../../../shapes/Draft";

class Document {
	constructor(draft: Draft = Draft.create(), markedDraft: Draft = Draft.create()) {
		this.draft = draft;
		this.markedDraft = markedDraft;
	}

	public markedDraft: Draft;
	public draft: Draft;
}

export {Document}