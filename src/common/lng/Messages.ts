import {PagesType} from "../page/PagesType";

class Messages {
    constructor() {
        const startPageMap = new Map<string, string>();
        startPageMap.set("startButton", "PLAY");
        startPageMap.set("levelsButton", "LEVELS");
        startPageMap.set("logo", "DraftCraft");
        this._messages.set(PagesType.StartPage, startPageMap);
        const levelsPageMap = new Map<string, string>();
        this._messages.set(PagesType.LevelsPage, new Map<string, string>());
        this._messages.set(PagesType.ResultPage, new Map<string, string>());
        this._messages.set(PagesType.DraftPage, new Map<string, string>());
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