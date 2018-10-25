import {Icons} from "../Icons";
import {Button} from "./Button";
import {BemInfo} from "../component/BemInfo";

class BackButton extends Button {
    constructor(bemInfo?: BemInfo) {
        super({
            icon: Icons.back(),
            bemInfo: bemInfo,
            blockName: "back-button",
        });
    }
}

export {BackButton};