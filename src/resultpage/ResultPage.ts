import {BasePage} from "../common/page/BasePage";
import {GameContext} from "../GameContext";
import {Messages} from "../common/lng/Messages";
import {PagesType} from "../common/page/PagesType";
import {Component} from "../common/components/component/Component";
import {Icons} from "../common/components/Icons";
import {Button} from "../common/components/button/Button";
import {HotKeyBinder} from "../common/hotkeys/HotKeysBinder";
import {Level} from "../model/Level";

class ResultPage extends BasePage {
    constructor(container: HTMLElement, gameContext: GameContext, messages: Messages, hotKeyBinder: HotKeyBinder) {
        super(container, messages, PagesType.ResultPage, hotKeyBinder);
        this._gameContext = gameContext;
        this.addChild(this._resultCard);
        const cardContent = new Component({
            bemInfo: this._resultCard.createChildBemInfo("content"),
        });
        this._resultCard.addChild(cardContent);

        const score = new Component({bemInfo: this._resultCard.createChildBemInfo("score")});
        cardContent.addChild(score);
        const scoreWrapper = new Component({bemInfo: this._resultCard.createChildBemInfo("score-wrapper")});
        score.addChild(scoreWrapper);
        scoreWrapper.addChild(this._currentScore);
        scoreWrapper.addChild(this._awardedScore);

        cardContent.addChild(this._message);
        cardContent.addChild(this._startHolder);
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
        if (currentLevel.isLevelPassed()) {
            await this._gameContext.selectNextLevel();
        }
    }

    private async _invalidateContent() {
        const currentLevel = await this._gameContext.currentLevel();
        const starsCount = Level.calculateStarsCount(currentLevel.lastScore());
        const isLevelPassed = currentLevel.isLevelPassed();
        const nextLevel = await this._gameContext.nextLevel();
        this._resultCard.updateModifier("result", isLevelPassed ? "good" : "bad");
        this._awardedScore.setContent(
            this._getMessage("awardedScore", currentLevel.awardedScore())
        );
        this._currentScore.setContent(
            this._getMessage("currentScore", currentLevel.lastScore())
        );
        const message = this._getMessage(
            starsCount >= Level.maxStarsCount() ?
                "markAMessage" :
            starsCount > 0 ?
                "markBMessage" :
                "markFMessage"
        );
        this._message.setContent(message);
        this._nextButton.setStyle("display", nextLevel ? "" : "none");
        this._invalidateStars(starsCount);
    }

    private _invalidateStars(starsCount: number) {
        this._startHolder.removeChildren();
        while (starsCount) {
            this._startHolder.addChild(new Component({
                bemInfo: this._resultCard.createChildBemInfo("star"),
                content: Icons.star()
            }));
            --starsCount;
        }
    }

    private _resultCard = new Component({ blockName: "result-card" });
    private _awardedScore = new Component({bemInfo: this._resultCard.createChildBemInfo("awarded-score")});
    private _currentScore = new Component({bemInfo: this._resultCard.createChildBemInfo("current-score")});
    private _message = new Component({bemInfo: this._resultCard.createChildBemInfo("message")});
    private _startHolder = new Component({bemInfo: this._resultCard.createChildBemInfo("stars-holder")});
    private _restartButton: Button = new Button({icon: Icons.restart(), blockName: "restart-button"});
    private _nextButton: Button = new Button({icon: Icons.next(), blockName: "next-button"});
    private _gameContext: GameContext;
}

export {ResultPage};