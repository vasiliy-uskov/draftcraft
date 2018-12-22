import {Component} from "../components/component/Component";
import {Icons} from "../components/Icons";

class Spinner extends Component {
    constructor(element: HTMLElement) {
        super({
            baseElement: element,
            blockName: "spinner",
        });
        this.addChild(new Component({
            bemInfo: this.createChildBemInfo("small-gear"),
            content: Icons.gear(),
        }));
        this.addChild(new Component({
            bemInfo: this.createChildBemInfo("large-gear"),
            content: Icons.gear(),
        }));
    }
}

export {Spinner};