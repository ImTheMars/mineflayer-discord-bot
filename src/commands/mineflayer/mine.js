const { Command } = require("discord-akairo");
const { stripIndents } = require("common-tags");
const { MessageEmbed } = require("discord.js");
const { bot } = require("../../index");

const collectBlock = require("mineflayer-collectblock").plugin;
bot.loadPlugin(collectBlock);

let mcData;
bot.once("spawn", () => {
  mcData = require("minecraft-data")(bot.version);
});

class MineCommand extends Command {
  constructor() {
    super("mine", {
      aliases: ["mine", "get"],
      channel: "guild",
      category: "Mineflayer",
      cooldown: 6000,
      ratelimit: 3,
      description: {
        content: "This makes the bot auto mine blocks for you.",
        usage: "[X, Y, Z]",
        examples: ["diamond_ore", "coal_ore"],
      },
      args: [
        {
          id: "block",
          type: "string",
          match: "rest",
        },
      ],
    });
  }

  async exec(message, args) {
    const errorRes = new MessageEmbed();
    {
      errorRes;
      errorRes.setTitle(`__**Missing Argument**__`);
      errorRes.setThumbnail(`https://crafatar.com/avatars/${bot.player.uuid}`);
      errorRes.setDescription(
        stripIndents`You forgot to enter the block name. Use **c.help mine** for the correct usage`
      );
      errorRes.setColor("#c36ba4");
      errorRes.setTimestamp();
    }

    if (!args.block) return message.channel.send(errorRes);

    let type = args.block;

    const blockType = mcData.blocksByName[type];
    if (!blockType) {
      const errorType = new MessageEmbed();
      {
        errorType;
        errorType.setTitle(`__**Invalid Block Name**__`);
        errorType.setThumbnail(
          `https://crafatar.com/avatars/${bot.player.uuid}`
        );
        errorType.setDescription(
          stripIndents`The block **${type}** doesn't exist or you typed it in wrong.`
        );
        errorType.setColor("#c36ba4");
        errorType.setTimestamp();
      }
      message.channel.send(errorType);
      return;
    }

    const blocks = bot.findBlocks({
      matching: blockType.id,
      maxDistance: 64,
      count: 20,
    });

    if (blocks.length === 0) {
      const errorFind = new MessageEmbed();
      {
        errorFind;
        errorFind.setTitle(`__**Block Not Found**__`);
        errorFind.setThumbnail(
          `https://crafatar.com/avatars/${bot.player.uuid}`
        );
        errorFind.setDescription(
          stripIndents`Unable to find the block you are looking for.`
        );
        errorFind.setColor("#c36ba4");
        errorFind.setTimestamp();
      }
      message.channel.send(errorFind);
      return;
    }

    const targets = [];
    for (let i = 0; i < Math.min(blocks.length, 20); i++) {
      targets.push(bot.blockAt(blocks[i]));
    }

    const blockFound = new MessageEmbed();
    {
      blockFound;
      blockFound.setTitle(`__**Blocks Found: ${targets.length}**__`);
      blockFound.setThumbnail(
        `https://crafatar.com/avatars/${bot.player.uuid}`
      );
      blockFound.setDescription(
        stripIndents`Successfully found **${targets.length}** blocks. Collecting the blocks now.`
      );
      blockFound.setColor("#c36ba4");
      blockFound.setTimestamp();
    }
    message.channel.send(blockFound);

    bot.collectBlock.collect(targets, (err) => {
      if (err) {
        const cmdError = new MessageEmbed();
        {
          cmdError;
          cmdError.setTitle(`__**Error**__`);
          cmdError.setThumbnail(
            `https://crafatar.com/avatars/${bot.player.uuid}`
          );
          cmdError.setDescription(stripIndents`${err.message}`);
          cmdError.setColor("#c36ba4");
          blockFound.setTimestamp();
        }
        message.channel.send(cmdError);
        console.log(err);
      } else {
        const doneMining = new MessageEmbed();
        {
          doneMining;
          doneMining.setTitle(`__**Error**__`);
          doneMining.setThumbnail(
            `https://crafatar.com/avatars/${bot.player.uuid}`
          );
          doneMining.setDescription(
            stripIndents`All the blocks have been collected. Exacute the command again if you would like me to collect more.`
          );
          doneMining.setColor("#6bc36c");
          blockFound.setTimestamp();
        }
        message.channel.send(doneMining);
      }
    });
  }
}

module.exports = MineCommand;
