import {ToolCreator} from "./ToolCreator";
import {BaseTool} from "./BaseTool";

interface IToolsFactory {
    createTools(toolFactory: ToolCreator): Array<BaseTool>;
}

export {IToolsFactory}