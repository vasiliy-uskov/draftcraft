import {BasePage} from "../common/page/BasePage";
import {GameContext} from "../GameContext";
import {Messages} from "../common/lng/Messages";
import {PagesType} from "../common/page/PagesType";
import {Component} from "../common/components/component/Component";
import {Icons} from "../common/components/Icons";
import {Button} from "../common/components/button/Button";
import {HotKeyBinder} from "../common/hotkeys/HotKeysBinder";

class ResultPage extends BasePage {
    constructor(container: HTMLElement, gameContext: GameContext, messages: Messages, hotKeyBinder: HotKeyBinder) {
        super(container, messages, PagesType.ResultPage, hotKeyBinder);
        this._gameContext = gameContext;
        const cardContent = new Component({
            bemInfo: this._resultCard.createChildBemInfo("content"),
        });
        this.addChild(this._resultCard);
        this._resultCard.addChild(cardContent);
        cardContent.addChild(this._score);
        cardContent.addChild(this._message);
        cardContent.addChild(this._startHolder);
        const controls = new Component({ bemInfo: this._resultCard.createChildBemInfo("controls")});
        this._resultCard.addChild(controls);

        const levelsButton = new Button({
            content: this._getMessage("levelsButton"),
            blockName: "levels-button"
        });
        this._addDisposable(levelsButton);
        controls.addChild(levelsButton);
        this._addHandler(levelsButton.clickEvent(), () => this._sendChangePageRequest(PagesType.LevelsPage));

        const homeButton = new Button({
            icon: Icons.home(),
            blockName: "home-button"
        });
        this._addDisposable(homeButton);
        controls.addChild(homeButton);
        this._addHandler(homeButton.clickEvent(), () => this._sendChangePageRequest(PagesType.StartPage));

        this._addDisposable(this._nextButton);
        this._addHandler(this._nextButton.clickEvent(), async () => {
            if (!await this._gameContext.lastLevelSelected()) {
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
        if (currentLevel.isLevelPassed() && !(await this._gameContext.lastLevelSelected())) {
            return this._gameContext.selectNextLevel();
        }
    }

    private async _invalidateContent() {
        const currentLevel = await this._gameContext.currentLevel();
        const isLevelPassed = currentLevel.isLevelPassed();
        this._resultCard.updateModifier("result", isLevelPassed ? "good" : "bad");
        this._score.setContent(currentLevel.score().toString());
        this._message.setContent(this._getMessage(isLevelPassed ? "successMessage" : "failMessage"));
        this._nextButton.setContent(isLevelPassed ? Icons.next() : Icons.restart());
        this._nextButton.setStyle("display", await this._gameContext.lastLevelSelected() ? "none" : "");
        this._startHolder.removeChildren();
        let starsCount = currentLevel.starsCount();
        while (starsCount) {
            this._startHolder.addChild(new Component({
                bemInfo: this._resultCard.createChildBemInfo("star"),
                content: Icons.star()
            }));
            --starsCount;
        }
    }

    private _resultCard = new Component({ blockName: "result-card" });
    private _score = new Component({bemInfo: this._resultCard.createChildBemInfo("score")});
    private _message = new Component({bemInfo: this._resultCard.createChildBemInfo("message")});
    private _startHolder = new Component({bemInfo: this._resultCard.createChildBemInfo("stars-holder")});
    private _nextButton: Button = new Button({icon: Icons.next(), blockName: "next-button"});
    private _gameContext: GameContext;
}

export {ResultPage};