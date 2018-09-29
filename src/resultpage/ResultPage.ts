import {BasePage} from "../common/page/BasePage";
import {GameContext} from "../model/GameContext";

class ResultPage extends BasePage {
    constructor(container: HTMLElement, gameContext: GameContext) {
        super(container);
    }
}

export {ResultPage};