import {Draft} from "../../../shapes/Draft";

interface IDocumentEditApi {
	addDraft(draft: Draft): IDocumentEditApi;

	removeDraft(draft: Draft): IDocumentEditApi;

	markDraft(draft: Draft): IDocumentEditApi;

	unmarkDraft(draft: Draft): IDocumentEditApi;

	updateView(): IDocumentEditApi;

	draft(): Draft;

	markedDraft(): Draft;

	commit(): void;

	reset(): void;
}

interface IWorkspaceModel {
	edit(editFn: (api: IDocumentEditApi) => void): void;

	markedDraft(): Draft;

	draft(): Draft;
}

export {IWorkspaceModel, IDocumentEditApi}