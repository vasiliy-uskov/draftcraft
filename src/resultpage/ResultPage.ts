import {BasePage} from "../common/page/BasePage";
import {GameContext} from "../model/GameContext";
import {Messages} from "../common/lng/Messages";
import {PagesType} from "../common/page/PagesType";
import {Component} from "../common/components/component/Component";
import {verify} from "../common/utils/typetools";
import {Icons} from "../common/components/Icons";
import {Button} from "../common/components/button/Button";

class ResultPage extends BasePage {
    constructor(container: HTMLElement, gameContext: GameContext, messages: Messages) {
        super(container, messages, PagesType.ResultPage);
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

        this._nextButton = new Button({
            icon: Icons.next(),
            blockName: "next-button"
        });
        this._addDisposable(this._nextButton);
        this._addHandler(this._nextButton.clickEvent(), () => {
            if (!this._lastLevelSelect()) {
                this._sendChangePageRequest(PagesType.DraftPage);
            }
        });
        controls.addChild(this._nextButton);
    }

    protected _beforeOpen() {
        this._invalidateContent();
    }

    protected _beforeClose() {
        const currentLevel = this._gameContext.currentLevel();
        if (currentLevel.isLevelPassed() && !this._lastLevelSelect()) {
            this._gameContext.setCurrentLevel(this._gameContext.currentLevelIndex() + 1);
        }

    }

    private _invalidateContent() {
        const currentLevel = this._gameContext.currentLevel();
        const isLevelPassed = currentLevel.isLevelPassed();
        this._resultCard.updateModifier("result", isLevelPassed ? "good" : "bad");
        this._score.setContent(verify(currentLevel.score()).toString());
        this._message.setContent(this._getMessage(isLevelPassed ? "successMessage" : "failMessage"));
        this._nextButton.setContent(isLevelPassed ? Icons.next() : Icons.restart());
        this._nextButton.setStyle("display", this._lastLevelSelect() ? "none" : "");
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

    private _lastLevelSelect():boolean {
        return this._gameContext.currentLevelIndex() == this._gameContext.getLevels().length - 1;
    }

    private _resultCard = new Component({ blockName: "result-card" });
    private _score = new Component({bemInfo: this._resultCard.createChildBemInfo("score")});
    private _message = new Component({bemInfo: this._resultCard.createChildBemInfo("message")});
    private _startHolder = new Component({bemInfo: this._resultCard.createChildBemInfo("stars-holder")});
    private _nextButton: Button;
    private _gameContext: GameContext;
}

export {ResultPage};