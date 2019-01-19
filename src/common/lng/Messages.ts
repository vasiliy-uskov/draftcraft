import {PagesType} from "../page/PagesType";

class Messages {
    constructor() {

        const common = new Map<string, string>();
        common.set("serverIsNotResponse", "Sorry, there is some server`s troubles. Come later.");
        common.set("sessionFailed", "Sorry, but your session is lost. Try to restart on mooped.");
        this._messages.set(PagesType.Common, common);

        const startPage = new Map<string, string>();
        startPage.set("startButton", "play");
        startPage.set("levelsButton", "levels");
        startPage.set("logo", "DraftCraft");
        this._messages.set(PagesType.StartPage, startPage);

        this._messages.set(PagesType.LevelsPage, new Map<string, string>());

        const resultPage = new Map<string, string>();
        resultPage.set("levelsButton", "levels");
        resultPage.set("successMessage", "Good job");
        resultPage.set("failMessage", "Try again");
        this._messages.set(PagesType.ResultPage, resultPage);

        const draftPage = new Map<string, string>();
        draftPage.set("task", "Task");
        draftPage.set("help", "Help");
        draftPage.set("finishButton", "Submit");
        this._messages.set(PagesType.DraftPage, draftPage);
    }

    getMessage(page: PagesType, messageId: string) : string {
        if (this._messages.has(page) && this._messages.get(page).has(messageId)) {
            return this._messages.get(page).get(messageId);
        }
        return messageId;
    }

    private _messages: Map<PagesType, Map<string, string>> = new Map();
}

export {Messages};