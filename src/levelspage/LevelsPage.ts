import {BasePage} from "../common/page/BasePage";
import {GameContext} from "../model/GameContext";

class LevelsPage extends BasePage {
    constructor(container: HTMLElement, gemeContext: GameContext) {
        super(container);
    }
}

export {LevelsPage};