const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

class ticketCommand extends Command {
  constructor() {
    super("ticket", {
      aliases: ["ticket"],
      channel: "guild",
      category: "Utilities",
      cooldown: 20000,
      ratelimit: 3,
      description: {
        content:
          "This command is for those who need help with anything. And by creating a ticket it helps keep everything private from the rest of the server.",
        usage: "[reason]",
        examples: ["Bot issue!"],
      },
      args: [
        {
          id: "reason",
          type: "string",
          match: "rest",
          default: "No reason provided",
        },
      ],
    });
  }

  async exec(message, args) {
    await message.delete();
    const embed = new MessageEmbed();
    {
      embed;
      embed.setTitle(`__**Ticket From ${message.member.user.username}**__`);
      embed.setThumbnail(message.member.user.displayAvatarURL());
      embed.setDescription(stripIndents`Thank you for creating a ticket ${message.member}. Please wait for staff to respond so that we can deal with your issue. After you have done with this ticket simply react below.\n
      **❯ Ticket Reason:** ${args.reason}`);
      embed.setColor("#c36ba4");
      embed.setTimestamp();
      embed.setFooter(
        this.client.user.username,
        this.client.user.displayAvatarURL()
      );
    }

    message.guild.channels
      .create(`${message.author.username}-ticket`, {
        reason: `${args.reason}`,
        permissionOverwrites: [
          {
            id: message.guild.id,
            deny: ["VIEW_CHANNEL"],
          },
          {
            id: message.author.id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
          },
          {
            id: "884603182204993536",
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
          },
        ],
      })
      .then((channel) => channel.send(embed))
      .then((message) => {
        message.react("🗑");
        this.client.on("messageReactionAdd", (reaction, user) => {
          if (reaction.emoji.name === "🗑" && user.id !== this.client.user.id) {
            message.channel.delete();
          }
        });
      });
  }
}

module.exports = ticketCommand;
