import {BasePage} from "../../_common/page/BasePage";
import {GameContext} from "../GameContext";
import {Messages} from "../../_common/lng/Messages";
import {PagesType} from "../../_common/page/PagesType";
import {Component} from "../../_common/components/component/Component";
import {Level} from "../model/Level";
import {BackButton} from "../../_common/components/button/BackButton";
import {Icons} from "../../_common/components/Icons";
import {HotKeyBinder} from "../../_common/hotkeys/HotKeysBinder";

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
        const levels = await this._gameContext.getLevels();
        levels.forEach(async (level, index) => {
            const levelView = LevelsPage._createLevelView(level, index + 1);
            this._levelsViews.push(levelView);
            this._levelsHolder.addChild(levelView);
            this._addDisposable(levelView);
            const levelEnabled = await this._gameContext.isLevelEnabled(level.id());
            if (levelEnabled) {
                this._listen("click", levelView, () => this._activateLevelHandler(level.id()));
            }
            levelView.updateModifier("enabled", levelEnabled);
        });
    }

    private _activateLevelHandler(id: string) {
        if (this._gameContext.isLevelEnabled(id)) {
            this._gameContext.setCurrentLevel(id).then(() => {
                this._sendChangePageRequest(PagesType.DraftPage);
            });
        }
    }

    private static _createLevelView(level: Level, index: number): Component {
        const levelView = new Component({
            blockName: "level",
        });
        levelView.addChild(new Component({
            bemInfo: levelView.createChildBemInfo("index"),
            content: index.toString()
        }));
        if (level.passed()) {
            const passIcon = new Component({
                bemInfo: levelView.createChildBemInfo("pass-icon"),
                content: Icons.accept(),
            });
            levelView.addChild(passIcon);
        }
        return levelView;
    }

    _gameContext: GameContext;
    _levelsHolder: Component;
    _levelsViews: Array<Component> = [];
}

export {LevelsPage};