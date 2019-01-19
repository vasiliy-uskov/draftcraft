import {Disposable} from "./common/disposable/Disposable";
import {PagesType} from "./common/page/PagesType";
import {StartPage} from "./startpage/StartPage";
import {LevelsPage} from "./levelspage/LevelsPage";
import {ResultPage} from "./resultpage/ResultPage";
import {DraftPage} from "./draftpage/DraftPage";
import {GameContext} from "./GameContext";
import {Messages} from "./common/lng/Messages";
import {HotKeyBinder} from "./common/hotkeys/HotKeysBinder";

class Game extends Disposable {
    constructor(gameContext: GameContext, messages: Messages) {
        super();
        const hotKeyBinder = new HotKeyBinder();

        const startPageContainer = document.getElementById("start-page") as HTMLElement;
        this._startPage = new StartPage(startPageContainer, messages, hotKeyBinder);
        this._addHandler(this._startPage.changePageRequestEvent(), (page) => {
            this._changePage(page);
        });

        const levelsPageContainer = document.getElementById("levels-page") as HTMLElement;
        this._levelsPage = new LevelsPage(levelsPageContainer, gameContext, messages, hotKeyBinder);
        this._addHandler(this._levelsPage.changePageRequestEvent(), (page) => {
            this._changePage(page);
        });

        const resultPageContainer = document.getElementById("result-page") as HTMLElement;
        this._resultPage = new ResultPage(resultPageContainer, gameContext, messages, hotKeyBinder);
        this._addHandler(this._resultPage.changePageRequestEvent(), (page) => {
            this._changePage(page);
        });

        const draftPageContainer = document.getElementById("draft-page") as HTMLElement;
        this._draftPage = new DraftPage(draftPageContainer, gameContext, messages, hotKeyBinder);
        this._addHandler(this._draftPage.changePageRequestEvent(), (page) => {
            this._changePage(page);
        });
    }

    public start() {
        this._openPage(PagesType.StartPage);
        this._currentPage = PagesType.StartPage;
    }

    private _changePage(page: PagesType) {
        this._closePage(this._currentPage).then(() => this._openPage(page));
        this._currentPage = page;
    }

    private _openPage(page: PagesType): Promise<void> {
        switch (page) {
            case PagesType.StartPage:
                return this._startPage.open();
            case PagesType.LevelsPage:
                return this._levelsPage.open();
            case PagesType.ResultPage:
                return this._resultPage.open();
            case PagesType.DraftPage:
                return this._draftPage.open();
        }
        throw new Error(`Unknown page type ${page}`);
    }

    private _closePage(page: PagesType): Promise<void> {
        switch (page) {
            case PagesType.StartPage:
                return this._startPage.close();
            case PagesType.LevelsPage:
                return this._levelsPage.close();
            case PagesType.ResultPage:
                return this._resultPage.close();
            case PagesType.DraftPage:
                return this._draftPage.close();
        }
        throw new Error(`Unknown page type ${page}`);
    }

    private _startPage: StartPage;
    private _levelsPage: LevelsPage;
    private _resultPage: ResultPage;
    private _draftPage: DraftPage;
    private _currentPage: PagesType = PagesType.StartPage;
}

export {Game};