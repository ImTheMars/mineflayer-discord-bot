const { Webhook } = require("discord-webhook-node");
const { bot } = require("../../index");
const settings = require("../../config/config.json");
const { chatLog, eventLog, debugLog } = settings;
const colors = require("colors");
const quickdb = require("quick.db");

const chat = new Webhook(chatLog);
const event = new Webhook(eventLog);
const debug = new Webhook(debugLog);

if (!event || !chat || !debug) {
  console.log("[ERROR] Please set up the webhooks in config.json".red);
}

bot.on("whisper", (username, message) => {
  if (message === "help") {
    // send message
    bot.chat(`/msg ${username} The commands are: kit, help, and ping`);
  }
});

bot.on("whisper", (username, message) => {
  if (message === "ping") {
    bot.chat(`/msg ${username} The bot's ping is ${bot.player.ping}ms`);
  }
});

bot.on("whisper", (username, message) => {
  if (quickdb.get(`blacklist_${username}`))
    return bot.chat(`/msg ${username} You are on cooldown for 5 hours!`);

  if (message === "kit") {
    bot.chat(`/tpa ${username}`);
    bot.chat(
      `/msg ${username} Please wait for the bot to do it's thing. If you kill it then you will be blacklisted!`
    );
    setTimeout(() => {
      bot.chat(`/msg ${username} Thanks for using me!`);
      bot.chat(`/kill`);
      // then add user to database and blacklist
      quickdb.set(`blacklist_${username}`, true);
      setTimeout(() => {
        quickdb.delete(`blacklist_${username}`);
      }, 3.6e6);
    }, 13000);
  }
});
