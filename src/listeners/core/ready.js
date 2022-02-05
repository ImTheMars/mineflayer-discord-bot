const { Listener } = require("discord-akairo");
var colors = require("colors");

class Ready extends Listener {
  constructor() {
    super("ready", {
      event: "ready",
      emitter: "client",
    });
  }

  exec() {
    let i = 0;
    setInterval(
      () =>
        this.client.user.setActivity(
          `${this.client.guilds.cache.size} servers | ${this.client.users.cache.size} users`,
          {
            type: "WATCHING",
          }
        ),
      15000
    );
    console.clear();
    console.log();
    console.log("Mineflayer Discord Bot".cyan);
    console.log("Created by OBNinjaa".cyan);
    console.log("dsc.gg/mineflayer".cyan);
    console.log();
  }
}

module.exports = Ready;
