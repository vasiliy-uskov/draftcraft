import {BasePage} from "../../_common/page/BasePage";
import {GameContext} from "../gamecontext/GameContext";
import {Messages} from "../../_common/lng/Messages";
import {PagesType} from "../../_common/page/PagesType";
import {Component} from "../../_common/components/component/Component";
import {BackButton} from "../../_common/components/button/BackButton";
import {HotKeyBinder} from "../../_common/hotkeys/HotKeysBinder";
import {LevelView} from "./LevelView";

class LevelsPage extends BasePage {
    constructor(container: HTMLElement, gameContext: GameContext, messages: Messages, hotKeyBinder: HotKeyBinder) {
        super(container, messages, PagesType.LevelsPage, hotKeyBinder);
        this._gameContext = gameContext;
        const startButton = new BackButton();
        this.addChild(startButton);
        this._addDisposable(startButton);
        this._addHandler(startButton.clickEvent(), () => this._sendChangePageRequest(PagesType.StartPage));

        this._levelsHolder = new Component({blockName: "levels-holder"});
        this._addDisposable(this._levelsHolder);
        this.addChild(this._levelsHolder);
    }

    protected async _beforeOpen() {
        await this._invalidateLevelsList();
    }

    protected async _beforeClose() {
        this._cleanLevelsList();
    }

    private _cleanLevelsList() {
        for (const levelView of this._levelsViews) {
            this._levelsHolder.removeChild(levelView);
            this._removeDisposable(levelView);
        }
        this._levelsViews = [];
    }

    private async _invalidateLevelsList() {
        const levels = [...(await this._gameContext.getLevels())];
        levels.forEach(async (level, index) => {
            const levelView = new LevelView(level, index + 1);
            this._levelsViews.push(levelView);
            this._levelsHolder.addChild(levelView);
            this._addDisposable(levelView);
            const levelAvailable = await this._levelAvailable(level.id);
            if (levelAvailable) {
                this._listen("click", levelView, () => this._activateLevel(level.id));
            }
            levelView.updateModifier("enabled", levelAvailable);
        });
    }

    private _activateLevel(id: string) {
        this._gameContext.setCurrentLevel(id).then(() => {
            this._sendChangePageRequest(PagesType.DraftPage);
        });
    }

    private async _levelAvailable(id: string) {
        const levelEnabled = await this._gameContext.isLevelEnabled(id);
        const levelPassed = await this._gameContext.isLevelPassed(id);
        return !levelPassed && levelEnabled;
    }

    _gameContext: GameContext;
    _levelsHolder: Component;
    _levelsViews: Array<Component> = [];
}

export {LevelsPage};