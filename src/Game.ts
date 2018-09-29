import {Disposable} from "./common/disposable/Disposable";
import {verify} from "./common/utils/typetools";
import {PagesType} from "./common/page/PagesType";
import {StartPage} from "./startpage/StartPage";
import {LevelsPage} from "./levelspage/LevelsPage";
import {ResultPage} from "./resultpage/ResultPage";
import {DraftPage} from "./draftpage/DraftPage";
import {GameContext} from "./model/GameContext";

class Game extends Disposable {
    constructor(gameContext: GameContext) {
        super();
        this._startPage = new StartPage(verify<HTMLElement>(document.getElementById("start-page")));
        this._addHandler(this._startPage.changePageRequestEvent(), (page) => {
            this._changePage(page);
        });

        const levelsPageContainer = verify<HTMLElement>(document.getElementById("levels-page"));
        this._levelsPage = new LevelsPage(levelsPageContainer, gameContext);
        this._addHandler(this._levelsPage.changePageRequestEvent(), (page) => {
            this._changePage(page);
        });

        const resultPageContainer = verify<HTMLElement>(document.getElementById("result-page"));
        this._resultPage = new ResultPage(resultPageContainer, gameContext);
        this._addHandler(this._resultPage.changePageRequestEvent(), (page) => {
            this._changePage(page);
        });

        const draftPageContainer = verify<HTMLElement>(document.getElementById("draft-page"));
        this._draftPage = new DraftPage(draftPageContainer, gameContext);
        this._addHandler(this._draftPage.changePageRequestEvent(), (page) => {
            this._changePage(page);
        });
    }

    start() {
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