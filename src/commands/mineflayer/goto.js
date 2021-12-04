const { Command } = require("discord-akairo");
const { stripIndents } = require("common-tags");
const { MessageEmbed } = require("discord.js");
const { bot } = require("../../index");

const { pathfinder, Movements } = require("mineflayer-pathfinder");
const { GoalBlock } = require("mineflayer-pathfinder").goals;

bot.loadPlugin(pathfinder);

class SayCommand extends Command {
  constructor() {
    super("goto", {
      aliases: ["goto", "go"],
      channel: "guild",
      category: "Mineflayer",
      cooldown: 6000,
      ratelimit: 3,
      description: {
        content:
          "This lets you move the bot to another location by using coordinates.",
        usage: "[X, Y, Z]",
        examples: ["200 80 10", "1000000 80 -1999"],
      },
      args: [
        {
          id: "x",
          type: "number",
        },
        {
          id: "y",
          type: "number",
        },
        {
          id: "z",
          type: "number",
        },
      ],
    });
  }

  async exec(message, args) {
    const xCoord = new MessageEmbed();
    {
      xCoord;
      xCoord.setTitle(`__**Missing Argument**__`);
      xCoord.setThumbnail(`https://crafatar.com/avatars/${bot.player.uuid}`);
      xCoord.setDescription(
        stripIndents`You for got to enter the **X** coordinate.`
      );
      xCoord.setColor("#c36ba4");
      xCoord.setTimestamp();
    }
    const yCoord = new MessageEmbed();
    {
      yCoord;
      yCoord.setTitle(`__**Missing Argument**__`);
      yCoord.setThumbnail(`https://crafatar.com/avatars/${bot.player.uuid}`);
      yCoord.setDescription(
        stripIndents`You for got to enter the **Y** coordinate.`
      );
      yCoord.setColor("#c36ba4");
      yCoord.setTimestamp();
    }
    const zCoord = new MessageEmbed();
    {
      zCoord;
      zCoord.setTitle(`__**Missing Argument**__`);
      zCoord.setThumbnail(`https://crafatar.com/avatars/${bot.player.uuid}`);
      zCoord.setDescription(
        stripIndents`You for got to enter the **Z** coordinate.`
      );
      zCoord.setColor("#c36ba4");
      zCoord.setTimestamp();
    }
    if (!args.x) return message.channel.send(xCoord);
    if (!args.y) return message.channel.send(yCoord);
    if (!args.z) return message.channel.send(zCoord);

    bot.on("path_update", (r) => {
      const nodesPerTick = ((r.visitedNodes * 50) / r.time).toFixed(2);
    });

    const mcData = require("minecraft-data")(bot.version);
    const defaultMove = new Movements(bot, mcData);
    bot.pathfinder.setMovements(defaultMove);
    bot.pathfinder.setGoal(new GoalBlock(args.x, args.y, args.z));

    const messageSend = new MessageEmbed();
    {
      messageSend;
      messageSend.setTitle(`__**Pathfinder: ${args.x},${args.y},${args.z}**__`);
      messageSend.setThumbnail(
        `https://crafatar.com/avatars/${bot.player.uuid}`
      );
      messageSend.setDescription(
        stripIndents`Moving towards the set coordinates.\nX: **${args.x}**\nY: **${args.y}**\nZ: **${args.z}**`
      );
      // messageSend.addField("X:", `${args.x}`);
      // messageSend.addField("Y:", `${args.y}`);
      // messageSend.addField("Z:", `${args.z}`);
      messageSend.setColor("#6bc36c");
      messageSend.setTimestamp();
    }

    message.channel.send(messageSend);
  }
}

module.exports = SayCommand;
