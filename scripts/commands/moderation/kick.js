/* eslint no-var: "off"*/
import * as Minecraft from "mojang-minecraft";

const World = Minecraft.world;

let isSilent;

/**
 * @name kick
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function kick(message, args) {
    // validate that required params are defined
    if (!message) {
        return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? (./commands/moderation/kick.js:10)");
    }
    if (!args) {
        return console.warn(`${new Date()} | ` + "Error: ${args} isnt defined. Did you forget to pass it? (./commands/moderation/kick.js:11)");
    }

    message.cancel = true;

    if (args[1] === "-s") {
        isSilent = true;
    } else {
        isSilent = false;
    }

    let player = message.sender;
    let reason = args.slice(1).join(" ").replace("-s", "") || "No reason specified";

    // make sure the user has permissions to run the command
    try {
        player.runCommand(`testfor @a[name="${player.nameTag}",tag=op]`);
    } catch (error) {
        return player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§r§4[§6Paradox§4]§r "},{"text":"You need to be Paradox-Opped to use this command."}]}`);
    }

    if (!args.length) {
        return player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§r§4[§6Paradox§4]§r "},{"text":"You need to provide who to kick!"}]}`);
    }
    
    // try to find the player requested
    for (let pl of World.getPlayers()) {
        if (pl.nameTag.toLowerCase().includes(args[0].toLowerCase().replace("@", "").replace("\"", ""))) {
            var member = pl.name;
        }
    }

    if (!member) {
        return player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§r§4[§6Paradox§4]§r "},{"text":"Couldnt find that player!"}]}`);
    }

    // make sure they dont kick themselves
    if (member === player.name) {
        return player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§4[§6Paradox§4]§r "},{"text":"You cannot kick yourself."}]}`);
    }

    try {
        if (!isSilent) {
            player.runCommand(`kick "${member}" ${reason}`);
        } else {
            player.runCommand(`event entity "${member}" paradox:kick`);
        }
    } catch (error) {
        console.warn(`${new Date()} | ` + error);
        return player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§r§4[§6Paradox§4]§r "},{"text":"I was unable to ban that player! Error: ${error}"}]}`);
    }
    return player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§4[§6Paradox§4]§r "},{"text":"${player.nameTag} has kicked ${member} (Silent:${isSilent}). Reason: ${reason}"}]}`);
}
