const { Command } = require("discord-akairo");
const { stripIndents } = require("common-tags");
const { MessageEmbed } = require("discord.js");
const { bot } = require("../../index");

class KitCommand extends Command {
  constructor() {
    super("kit", {
      aliases: ["kit"],
      channel: "guild",
      category: "Mineflayer",
      cooldown: 3.6e6,
      ratelimit: 1,
      description: {
        content: "This command lets users get kits from the minecraft server.",
        usage: "[username]",
        examples: ["OBNinjaa"],
      },
      args: [
        {
          id: "username",
          match: "rest",
          prompt: {
            start: "What is your username?",
            retry: "Invalid username.",
          },
        },
      ],
    });
  }
  async exec(message, args) {
    // embed
    const errorRes = new MessageEmbed();
    {
      errorRes;
      errorRes.setTitle(`__**Missing Argument**__`);
      errorRes.setThumbnail(`https://crafatar.com/avatars/${bot.player.uuid}`);
      errorRes.setDescription(
        stripIndents`You forgot to enter a username.\nUse **c.help kit** for the correct usage`
      );
      errorRes.setColor("#c36b6b");
      errorRes.setTimestamp();
    }

    if (!args.username) return message.channel.send(errorRes);
    await message.delete();
    const messageSend = new MessageEmbed();
    {
      messageSend;
      messageSend.setTitle(`__**Kit Request For: ${args.username}**__`);
      messageSend.setThumbnail(
        `https://crafatar.com/avatars/${bot.player.uuid}`
      );
      messageSend.setDescription(
        `Successfully gave the kit to ${args.username}`
      );
      messageSend.setColor("#c36b6b");
      messageSend.setTimestamp();
    }
    message.channel.send(messageSend);
    bot.chat(`/tpa ${args.username}`);
    bot.chat(
      `/msg ${args.username} Please wait for the bot to do it's thing. If you kill it then you will be blacklisted from using this command.`
    );
    setTimeout(() => {
      bot.chat(`/msg ${args.username} Thanks for using me!`);
      bot.chat(`/kill`);
    }, 13000);
  }
}

module.exports = KitCommand;
