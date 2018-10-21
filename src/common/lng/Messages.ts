import {PagesType} from "../page/PagesType";

class Messages {
    constructor() {
        this._messages.set(PagesType.StartPage, {
            "startButton": "PLAY",
            "levelsButton": "LEVELS",
        });
        this._messages.set(PagesType.LevelsPage, {});
        this._messages.set(PagesType.ResultPage, {});
        this._messages.set(PagesType.DraftPage, {});
    }

    getMessage(page: PagesType, messageId: string) : string {
        const message = this._messages.get(page)[messageId];
        return message ? message : messageId;
    }

    private _messages: Map<PagesType, Object> = new Map();
}

export {Messages};