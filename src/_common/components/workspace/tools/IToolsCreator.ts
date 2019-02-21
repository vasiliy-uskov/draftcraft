import {ToolFactory} from "./ToolFactory";
import {BaseTool} from "./BaseTool";

interface IToolsCreator {
    createTools(toolFactory: ToolFactory): Array<BaseTool>;
}

export {IToolsCreator}