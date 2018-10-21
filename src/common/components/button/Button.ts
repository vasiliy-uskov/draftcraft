import {Component} from "../component/Component";
import {TagsName} from "../TagsName";
import {EventDispatcher} from "../../disposable/EventDispatcher";
import {BemInfo} from "../component/BemInfo";

class Button extends Component {
    constructor({content, bemInfo}: {content: string, bemInfo: BemInfo}) {
        super({
            tagName: TagsName.button,
            blockName: "button",
            content,
        });
        this.addBemInfo(bemInfo);
        this._listen("click", this, (event) => this._clickEvent.dispatch(event));
    }

    clickEvent(): EventDispatcher<Event> {
        return this._clickEvent;
    }

    private _clickEvent: EventDispatcher<Event> = this._createEventDispatcher();
}

export {Button};