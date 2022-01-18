const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { bot } = require("../../index");

class InfoCommand extends Command {
  constructor() {
    super("info", {
      aliases: ["info", "stats"],
      channel: "guild",
      category: "Mineflayer",
      cooldown: 6000,
      ratelimit: 3,
      description: {
        content:
          "This command outputs basic information about the bot.",
      },
    });
  }

  async exec(message) {
    const embed = new MessageEmbed();
    {
      embed;
      embed.setTitle(
        `__**Basic Information For: ${bot.player.username}**__`
      );
      embed.setThumbnail(
        `https://crafatar.com/avatars/${bot.player.uuid}`
      );
      embed.addField("Ping", `${bot.player.ping}`);
      embed.addField("Health", `${bot.health}`);
      embed.addField("Version", `${bot.version}`);
      embed.addField("UUID", `${bot.player.uuid}`);
      embed.setColor("#c36ba4");
      embed.setTimestamp();
    }
    await message.channel.send(embed);
  }
}

module.exports = InfoCommand;
