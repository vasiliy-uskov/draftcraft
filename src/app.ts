import {GameContext} from "./model/GameContext";
import {Game} from "./Game";
import {Messages} from "./common/lng/Messages";
import {Level} from "./model/Level";

const gameContext = new GameContext([
    new Level(`
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae urna consectetur, efficitur lectus et, aliquam neque. Proin consequat consequat nisi, sit amet malesuada nisl vestibulum a. Etiam at eros nulla. Aliquam sit amet neque vitae tortor gravida blandit. Nulla facilisi. Nunc turpis libero, consequat sit amet erat at, imperdiet consectetur orci. Cras sagittis ligula turpis, ultrices molestie velit consectetur tincidunt. Nulla lectus ante, porta eget sodales sed, consectetur nec diam. Fusce et lobortis purus. Etiam ac massa sed nisl fermentum molestie sit amet in leo. Cras vitae risus in leo facilisis malesuada et non arcu. Donec eu felis id ante posuere venenatis. Sed feugiat urna at odio aliquam, et egestas orci efficitur. Praesent eget elit lacus. Vestibulum in metus euismod, porttitor enim in, consectetur nunc.

In blandit elit nec dui vehicula hendrerit. Suspendisse in gravida arcu. Praesent at neque ut ipsum iaculis hendrerit. Nullam gravida, lectus aliquam lacinia aliquam, sapien ipsum maximus nisl, non maximus enim orci ut libero. Fusce ac nunc est. Vivamus in sem eu neque tempus mattis. Fusce pellentesque ornare tincidunt.

Etiam vel ornare erat. Curabitur vehicula leo leo, quis sagittis urna sodales et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a dolor mi. Etiam et rutrum neque, at fermentum turpis. Etiam diam turpis, ultricies sit amet velit id, iaculis auctor massa. Aliquam lectus ipsum, vestibulum ut mauris nec, dignissim elementum ligula. Maecenas fringilla, ante non rutrum egestas, quam ex pellentesque elit, vel lobortis odio urna vitae felis. Suspendisse non finibus sem. Donec ut ante ultrices, venenatis odio quis, laoreet purus. Ut mattis non diam a vestibulum. Suspendisse commodo congue libero ac commodo. Vestibulum luctus malesuada iaculis. Curabitur quis vestibulum felis, vitae mollis mi. Donec ut enim porttitor, gravida arcu semper, faucibus mauris. Sed vulputate augue eu faucibus molestie.

Curabitur sodales tempus sem, sit amet pretium arcu pretium quis. Cras tortor mi, iaculis elementum lectus a, elementum porttitor libero. Duis tempor bibendum ex, et tincidunt nisi. Nunc euismod tortor a egestas tincidunt. Nunc tristique eu libero non posuere. Nullam vestibulum lorem et ipsum ornare dignissim. Ut vehicula augue sit amet rhoncus egestas. Pellentesque id viverra erat. Ut consectetur libero ac rutrum molestie. Sed accumsan arcu ac libero congue, at ultrices velit eleifend. Proin dolor purus, fringilla eget ultricies vitae, commodo sed felis. Ut sed dictum lacus. Donec vulputate dolor orci, ut mollis orci ullamcorper vitae.
    `, "Level", "./build/Sterling.jpg", 600),
    new Level("Task", "Level", "", 700),
    new Level("Task", "Level", "", 1000),
    new Level("Task", "Level", "", 700),
    new Level("Task", "Level", "", 120),
    new Level("Task", "Level", ""),
    new Level("Task", "Level", ""),
]);
const messages = new Messages();
const game = new Game(gameContext, messages);
game.start();