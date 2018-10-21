import {BasePage} from "../common/page/BasePage";
import {GameContext} from "../model/GameContext";
import {Messages} from "../common/lng/Messages";
import {PagesType} from "../common/page/PagesType";
import {Button} from "../common/components/button/Button";
import {Component} from "../common/components/component/Component";
import {BemInfo} from "../common/components/component/BemInfo";
import {Direction} from "../common/effects/transition/Direction";
import {Level} from "../model/Level";
import {Icons} from "../common/components/Icons";

class LevelsPage extends BasePage {
    constructor(container: HTMLElement, gameContext: GameContext, messages: Messages) {
        super(container, messages, PagesType.LevelsPage);
        this._gameContext = gameContext;
        const startButton = new Button({
            content: Icons.Back,
            bemInfo: new BemInfo("icon-button")
        });
        this.addChild(startButton);
        this._addDisposable(startButton);
        this._addHandler(startButton.clickEvent(), () => this._sendChangePageRequest(PagesType.StartPage));
        this._levelsHolder = new Component({blockName: "levels-holder"});
        this.addChild(this._levelsHolder);
    }

    open(direction: Direction): Promise<void> {
        this._invalidateLevelsList();
        return super.open(direction);
    }

    _invalidateLevelsList() {
        for (const levelView of this._levelsViews) {
            this.removeChild(levelView);
            this._removeDisposable(levelView);
        }
        const levels = this._gameContext.getLevels();
        levels.forEach((level, index) => {
            const levelView = this._createLevelView(level, index);
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
            blockName: "level"
        });
        levelView.addChild(new Component({
            bemInfo: levelView.createChildBemInfo("index"),
            content: index.toString()
        }));
        let starsCount = level.starsCount();
        while (starsCount) {
            levelView.addChild(new Component({
                bemInfo: levelView.createChildBemInfo("star"),
            }));
            --starsCount;
        }
        return levelView;
    }

    _gameContext: GameContext;
    _levelsHolder: Component;
    _levelsViews: Array<Component> = [];
}

export {LevelsPage};