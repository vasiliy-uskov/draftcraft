import {BasePage} from "../common/page/BasePage";
import {GameContext} from "../model/GameContext";
import {Messages} from "../common/lng/Messages";
import {PagesType} from "../common/page/PagesType";
import {Component} from "../common/components/component/Component";
import {Direction} from "../common/effects/transition/Direction";
import {Level} from "../model/Level";
import {BackButton} from "../common/components/button/BackButton";
import {Icons} from "../common/components/Icons";

class LevelsPage extends BasePage {
    constructor(container: HTMLElement, gameContext: GameContext, messages: Messages) {
        super(container, messages, PagesType.LevelsPage);
        this._gameContext = gameContext;
        const startButton = new BackButton();
        this.addChild(startButton);
        this._addDisposable(startButton);
        this._addHandler(startButton.clickEvent(), () => this._sendChangePageRequest(PagesType.StartPage));

        this._levelsHolder = new Component({blockName: "levels-holder"});
        this._addDisposable(this._levelsHolder);
        this.addChild(this._levelsHolder);
    }

    protected _beforeOpen() {
        this._invalidateLevelsList();
    }

    private _invalidateLevelsList() {
        for (const levelView of this._levelsViews) {
            this._levelsHolder.removeChild(levelView);
            this._removeDisposable(levelView);
        }
        const levels = this._gameContext.getLevels();
        this._levelsViews = [];
        levels.forEach((level, index) => {
            const levelView = this._createLevelView(level, index + 1);
            this._addDisposable(levelView);
            this._listen("click", levelView, () => {
                this._gameContext.setCurrentLevel(index);
                this._sendChangePageRequest(PagesType.DraftPage);
            });
            this._levelsViews.push(levelView);
            this._levelsHolder.addChild(levelView);
        })
    }

    _createLevelView(level: Level, index: number): Component {
        const levelView = new Component({
            blockName: "level",
        });
        levelView.addChild(new Component({
            bemInfo: levelView.createChildBemInfo("index"),
            content: index.toString()
        }));
        const startHolder = new Component({
            bemInfo: levelView.createChildBemInfo("stars-holder"),
        });
        let starsCount = level.starsCount();
        while (starsCount) {
            startHolder.addChild(new Component({
                bemInfo: levelView.createChildBemInfo("star"),
                content: Icons.star()
            }));
            --starsCount;
        }
        levelView.addChild(startHolder);
        return levelView;
    }

    _gameContext: GameContext;
    _levelsHolder: Component;
    _levelsViews: Array<Component> = [];
}

export {LevelsPage};