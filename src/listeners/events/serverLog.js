const { Webhook } = require("discord-webhook-node");
const { bot } = require("../../index");
const settings = require("../../config/config.json");
const { chatLog, eventLog, debug } = settings;

const chat = new Webhook(chatLog);
const event = new Webhook(eventLog);

if (!event || !chat || !debug) {
  console.log("Please set up the webhooks in config.json");
}

bot.on("chat", (username, message) => {
  if (username === bot.username) return;
  if (message.includes("http")) return;
  chat.send(`__**[${username}]**__ **${message}**`);
});

bot.on("join", (user) => {
  chat.send(`**${user.username}** has joined the server!`);
});

bot.on("leave", (user) => {
  chat.send(`**${user.username}** has left the server!`);
});

bot.on("debug", (info) => {
  debug.send(`**[DEBUG]** ${info}`);
});
