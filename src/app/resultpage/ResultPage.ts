import {BasePage} from "../../_common/page/BasePage";
import {GameContext} from "../model/GameContext";
import {Messages} from "../../_common/lng/Messages";
import {PagesType} from "../../_common/page/PagesType";
import {Component} from "../../_common/components/component/Component";
import {Icons} from "../../_common/components/Icons";
import {Button} from "../../_common/components/button/Button";
import {HotKeyBinder} from "../../_common/hotkeys/HotKeysBinder";

class ResultPage extends BasePage {
    constructor(container: HTMLElement, gameContext: GameContext, messages: Messages, hotKeyBinder: HotKeyBinder) {
        super(container, messages, PagesType.ResultPage, hotKeyBinder);
        this._gameContext = gameContext;
        this.addChild(this._resultCard);
        const cardContent = new Component({
            bemInfo: this._resultCard.createChildBemInfo("content"),
        });
        this._resultCard.addChild(cardContent);

        cardContent.addChild(this._markIcon);

        cardContent.addChild(this._message);

        const controls = new Component({bemInfo: this._resultCard.createChildBemInfo("controls")});
        this._resultCard.addChild(controls);

        const levelsButton = new Button({
            content: this._getMessage("levelsButton"),
            blockName: "levels-button"
        });
        this._addDisposable(levelsButton);
        controls.addChild(levelsButton);
        this._addHandler(levelsButton.clickEvent(), () => this._sendChangePageRequest(PagesType.LevelsPage));

        this._addDisposable(this._restartButton);
        controls.addChild(this._restartButton);
        this._addHandler(this._restartButton.clickEvent(), () => {
            this._sendChangePageRequest(PagesType.DraftPage);
        });

        this._addDisposable(this._nextButton);
        this._addHandler(this._nextButton.clickEvent(), async () => {
            if (await this._gameContext.nextLevel()) {
                this._sendChangePageRequest(PagesType.DraftPage);
                await this._incrementLevel();
            }
        });
        controls.addChild(this._nextButton);
    }

    protected async _beforeOpen() {
        await this._invalidateContent();
    }

    private async _incrementLevel() {
        const currentLevel = await this._gameContext.currentLevel();
        if (currentLevel.passed()) {
            await this._gameContext.selectNextLevel();
        }
    }

    private async _invalidateContent() {
        const currentLevel = await this._gameContext.currentLevel();
        const nextLevel = await this._gameContext.nextLevel();
        this._resultCard.updateModifier("result", currentLevel.passed() ? "good" : "bad");
        const message = this._getMessage(
            currentLevel.passed() ? "levelPassedMessage" : "levelFailMessage"
        );
        this._message.setContent(message);
        this._markIcon.setContent(currentLevel.passed() ? Icons.accept() : Icons.sad());
        this._nextButton.setStyle("display", nextLevel ? "" : "none");
    }

    private _resultCard = new Component({ blockName: "result-card" });
    private _message = new Component({bemInfo: this._resultCard.createChildBemInfo("message")});
    private _markIcon = new Component({bemInfo: this._resultCard.createChildBemInfo("mark-icon")});
    private _restartButton: Button = new Button({icon: Icons.restart(), blockName: "restart-button"});
    private _nextButton: Button = new Button({icon: Icons.next(), blockName: "next-button"});
    private _gameContext: GameContext;
}

export {ResultPage};