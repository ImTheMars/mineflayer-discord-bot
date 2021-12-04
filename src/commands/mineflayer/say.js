const { Command } = require("discord-akairo");
const { stripIndents } = require("common-tags");
const { MessageEmbed } = require("discord.js");
const { bot } = require("../../index");

class SayCommand extends Command {
  constructor() {
    super("say", {
      aliases: ["say", "echo"],
      channel: "guild",
      category: "Mineflayer",
      cooldown: 6000,
      ownerOnly: true,
      ratelimit: 3,
      description: {
        content:
          "This lets you send a message to whatever minecraft server the bot is in.",
        usage: "[my custom message]",
        examples: ["hello world", "dsc.gg/wolkig"],
      },
      args: [
        {
          id: "string",
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
        stripIndents`You forgot to enter the message you want to send.\nUse **c.help say** for the correct usage`
      );
      errorRes.setColor("#c36ba4");
      errorRes.setTimestamp();
    }

    if (!args.string) return message.channel.send(errorRes);
    await message.delete();
    const messageSend = new MessageEmbed();
    {
      messageSend;
      messageSend.setTitle(`__**Message Sent**__`);
      messageSend.setThumbnail(
        `https://crafatar.com/avatars/${bot.player.uuid}`
      );
      messageSend.setDescription(
        stripIndents`**AUTHOR:** ${message.author.username}\n**MESSAGE:** ${args.string}`
      );
      messageSend.setColor("#6bc36c");
      messageSend.setTimestamp();
    }
    message.channel.send(messageSend);

    bot.chat(`${args.string}`);
  }
}

module.exports = SayCommand;
