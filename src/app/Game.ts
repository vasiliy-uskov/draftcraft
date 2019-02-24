import {Disposable} from "../_common/disposable/Disposable";
import {PagesType} from "../_common/page/PagesType";
import {StartPage} from "./startpage/StartPage";
import {LevelsPage} from "./levelspage/LevelsPage";
import {ResultPage} from "./resultpage/ResultPage";
import {DraftPage} from "./draftpage/DraftPage";
import {GameContext} from "./gamecontext/GameContext";
import {Messages} from "../_common/lng/Messages";
import {HotKeyBinder} from "../_common/hotkeys/HotKeysBinder";
import {ErrorPage} from "./errorpage/ErrorPage";
import {IErrorDispatcher} from "./IErrorDispatcher";

class Game extends Disposable {
    constructor(gameContext: GameContext, messages: Messages, errorDispatcher: IErrorDispatcher) {
        super();
        const hotKeyBinder = new HotKeyBinder();

        const errorPageContainer = document.getElementById("error-page") as HTMLElement;
        this._errorPage = new ErrorPage(errorPageContainer, errorDispatcher, messages, hotKeyBinder);
        this._addHandler(this._errorPage.changePageRequestEvent(), this._open.bind(this));

        const startPageContainer = document.getElementById("start-page") as HTMLElement;
        this._startPage = new StartPage(startPageContainer, messages, hotKeyBinder);
        this._addHandler(this._startPage.changePageRequestEvent(), this._open.bind(this));

        const levelsPageContainer = document.getElementById("levels-page") as HTMLElement;
        this._levelsPage = new LevelsPage(levelsPageContainer, gameContext, messages, hotKeyBinder);
        this._addHandler(this._levelsPage.changePageRequestEvent(), this._open.bind(this));

        const resultPageContainer = document.getElementById("result-page") as HTMLElement;
        this._resultPage = new ResultPage(resultPageContainer, gameContext, messages, hotKeyBinder);
        this._addHandler(this._resultPage.changePageRequestEvent(), this._open.bind(this));

        const draftPageContainer = document.getElementById("draft-page") as HTMLElement;
        this._draftPage = new DraftPage(draftPageContainer, gameContext, messages, hotKeyBinder);
        this._addHandler(this._draftPage.changePageRequestEvent(), this._open.bind(this));
    }

    public start(page: PagesType = PagesType.StartPage) {
        this._currentPage = this._openPage(page).then(() => page);
    }

    private _open(page: PagesType) {
        this._currentPage = this._changePage(page);
    }

    private _changePage(page: PagesType): Promise<PagesType> {
        return this._currentPage
                .then(this._closePage.bind(this))
                .then(this._openPage.bind(this, page))
                .then(() => page);
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
            case PagesType.ErrorPage:
                return this._errorPage.open();
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
            case PagesType.ErrorPage:
                return this._errorPage.close();
        }
        throw new Error(`Unknown page type ${page}`);
    }

    private _startPage: StartPage;
    private _levelsPage: LevelsPage;
    private _resultPage: ResultPage;
    private _draftPage: DraftPage;
    private _errorPage: ErrorPage;
    private _currentPage = Promise.resolve(PagesType.StartPage);
}

export {Game};