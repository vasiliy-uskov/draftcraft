import {Component} from "../common/components/component/Component";
import {Icons} from "../common/components/Icons";
import {EventDispatcher} from "../common/disposable/EventDispatcher";

class TaskView extends Component {
    constructor(helpButtonHint: string) {
        super({
            blockName: "task"
        });

        this._addDisposable(this._content);
        this.addChild(this._content);

        const infoButton = new Component({
            bemInfo: this.createChildBemInfo("info-button"),
            content: Icons.question(),
        });
        infoButton.setAttribute("title", helpButtonHint);
        this._addDisposable(infoButton);
        this.addChild(infoButton);
        this._listen("click", infoButton, () => this._helpRequestEvent.dispatch());

    }

    public helpRequestEvent(): EventDispatcher<void> {
        return this._helpRequestEvent;
    }

    public setContent(content: string) {
        this._content.setContent(content);
    }

    public setTextContent(text: string) {
        this._content.setTextContent(text);
    }

    private _helpRequestEvent = this._createEventDispatcher();
    private _content = new Component({bemInfo: this.createChildBemInfo("content")});
}

export {TaskView}