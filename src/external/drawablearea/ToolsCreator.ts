import {BaseTool} from "../../_common/components/workspace/tools/BaseTool";
import {ToolFactory} from "../../_common/components/workspace/tools/ToolFactory";
import {IToolsCreator} from "../../_common/components/workspace/tools/IToolsCreator";

class ToolsCreator implements IToolsCreator {
    createTools(toolFactory: ToolFactory): Array<BaseTool> {
        return [
            toolFactory.createLineTool(),
            toolFactory.createCompassTool(),
            toolFactory.createDotTool(),
            toolFactory.createSelectTool()
        ];
    }
}

export {ToolsCreator};