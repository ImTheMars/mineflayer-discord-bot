const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

class GuildCommand extends Command {
  constructor() {
    super("guild", {
      aliases: ["guild"],
      category: "Developer",
      ownerOnly: true,
      typing: true,
      quoted: false,
      description: {
        content: "Check which servers the bot is in.",
        permissions: [],
      },
    });
  }

  async exec(message, args) {
    var invites = []; // starting array
    message.client.guilds.cache.forEach(async (guild) => {
      // iterate loop on each guild bot is in

      // get the first channel that appears from that discord, because
      // `.createInvite()` is a method for a channel, not a guild.
      const channel = guild.channels.cache
        .filter((channel) => channel.type === "text")
        .first();

      if (!channel || !channel.createInvite) return;

      await channel
        .createInvite({ maxAge: 0, maxUses: 0 })
        .then(async (invite) => {
          invites.push(`${guild.name} - ${invite.url}`); // push invite link and guild name to array
        })
        .catch((error) => console.log(error));
      console.log(invites);
    });
  }
}

module.exports = GuildCommand;
