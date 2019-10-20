import {PagesType} from "../page/PagesType";
import {verify, verifyNumber} from "../utils/typetools";

class Messages {
	constructor() {

		const error = new Map<string, string>();
		error.set("serverIsNotResponse", "Sorry, there is some server`s troubles. Come later.");
		error.set("sessionFailed", "Sorry, but your session is lost. Try to restart on mooped.");
		this._messages.set(PagesType.ErrorPage, error);

		const startPage = new Map<string, string>();
		startPage.set("startButton", "play");
		startPage.set("levelsButton", "levels");
		startPage.set("logo", "DraftCraft");
		this._messages.set(PagesType.StartPage, startPage);

		this._messages.set(PagesType.LevelsPage, new Map<string, string>());

		const resultPage = new Map<string, string>();
		resultPage.set("levelsButton", "levels");
		resultPage.set("levelPassedMessage", "Good job!");
		resultPage.set("levelFailMessage", "Try again");
		this._messages.set(PagesType.ResultPage, resultPage);

		const draftPage = new Map<string, string>();
		draftPage.set("task", "Task");
		draftPage.set("help", "Help");
		draftPage.set("finishButton", "Submit");
		draftPage.set("helpButtonHint", "Help");
		this._messages.set(PagesType.DraftPage, draftPage);
	}

	getMessage(page: PagesType, messageId: string, ...params: Array<string | number>): string {
		try {
			verify(this._messages.has(page) && this._messages.get(page).has(messageId));
			const getParam = (i: string) => {
				const index = verifyNumber(+i.replace("$", ""));
				return params[index].toString();
			};
			return this._messages
				.get(page)
				.get(messageId)
				.replace(/\$([0-9]+)/g, getParam);
		} catch {
			return messageId;
		}
	}

	private _messages: Map<PagesType, Map<string, string>> = new Map();
}

export {Messages};