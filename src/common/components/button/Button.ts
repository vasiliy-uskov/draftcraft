import {Component} from "../component/Component";
import {TagsName} from "../TagsName";
import {EventDispatcher} from "../../disposable/EventDispatcher";
import {BemInfo} from "../component/BemInfo";

class Button extends Component {
    constructor({text, bemInfo}: {text: string, bemInfo: BemInfo}) {
        super({
            tagName: TagsName.button,
            blockName: "button",
        });
        this.addBemInfo(bemInfo);
        this.setTextContent(text);
        this._listen("click", this, (event) => this._clickEvent.dispatch(event));
    }

    clickEvent(): EventDispatcher<Event> {
        return this._clickEvent;
    }

    private _clickEvent: EventDispatcher<Event> = this._createEventDispatcher();
}

export {Button};