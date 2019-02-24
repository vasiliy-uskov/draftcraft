import {BasePage} from "../../_common/page/BasePage";
import {GameContext} from "../gamecontext/GameContext";
import {Messages} from "../../_common/lng/Messages";
import {PagesType} from "../../_common/page/PagesType";
import {Workspace} from "../../_common/components/workspace/Workspace";
import {Toolbar} from "../../_common/components/toolbar/Toolbar";
import {BackButton} from "../../_common/components/button/BackButton";
import {Button} from "../../_common/components/button/Button";
import {HotKeyBinder} from "../../_common/hotkeys/HotKeysBinder";
import {InfoPopup} from "../../_common/components/popup/InfoPopup";
import {TaskView} from "./TaskView";
import {Component} from "../../_common/components/component/Component";

class DraftPage extends BasePage {
    constructor(container: HTMLElement, gameContext: GameContext, messages: Messages, hotKeyBinder: HotKeyBinder) {
        super(container, messages, PagesType.DraftPage, hotKeyBinder);

        this._gameContext = gameContext;

        const taskWrapper = new Component({blockName: "task-wrapper"});
        this.addChild(taskWrapper);
        this._addDisposable(this._taskView);
        taskWrapper.addChild(this._taskView);
        this._addHandler(this._taskView.helpRequestEvent(), () => this._helpPopup.open());

        this._addDisposable(this._workspace);
        this.addChild(this._workspace);

        this._addDisposable(this._toolbar);
        this.addChild(this._toolbar);

        this._addDisposable(this._helpPopup);
        this.addChild(this._helpPopup);

        const backButton = new BackButton();
        this._addDisposable(backButton);
        this.addChild(backButton);
        this._addHandler(backButton.clickEvent(), () => this._sendChangePageRequest(PagesType.StartPage));

        const finishButton = new Button({
            blockName: "finish-button",
            content: this._getMessage("finishButton"),
        });
        this._addDisposable(finishButton);
        this.addChild(finishButton);
        this._addHandler(finishButton.clickEvent(), () => {
            this._setLevelAnswer();
            this._sendChangePageRequest(PagesType.ResultPage);
        });
    }

    private _setLevelAnswer() {
        this._addClosingParallelTask(() => {
            const answer = JSON.stringify(this._workspace.draft().serialize());
            return this._gameContext.setCurrentLevelAnswer(answer);
        });
    }

    protected _initHotKeyBinder(hotKeyBinder: HotKeyBinder) {
        hotKeyBinder.setUndoHandler(() => this._workspace.undo());
        hotKeyBinder.setRedoHandler(() => this._workspace.redo());
        hotKeyBinder.setResetHandler(() => this._toolbar.resetTools())
    }

    protected async _beforeOpen() {
        const currentLevel = await this._gameContext.currentLevel();
        this._workspace.setBackgroundImage(currentLevel.img);
        this._workspace.setCanvasSize(currentLevel.canvasSize);
        this._taskView.setContent(currentLevel.task);
        this._helpPopup.setContent(currentLevel.help);
        this._toolbar.activateFirstTool();
    }

    protected async _beforeClose() {
        this._helpPopup.setActivated(false);
    }

    protected async _afterClose() {
        this._workspace.clean();
    }

    private _gameContext: GameContext;
    private _helpPopup = new InfoPopup({blockName: "help-popup"});
    private _workspace = new Workspace(creator => [
        creator.createLineTool(),
        creator.createCompassTool(),
        creator.createDotTool()
    ]);
    private _taskView = new TaskView(this._getMessage("helpButtonHint"));
    private _toolbar = new Toolbar(this._workspace.tools());
}

export {DraftPage};