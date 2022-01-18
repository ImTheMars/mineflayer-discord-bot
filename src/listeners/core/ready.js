const { Listener } = require("discord-akairo");
var colors = require("colors");
var figlet = require("figlet");

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
    console.log();
    console.log(
      colors.yellow(
        figlet.textSync(" Cloudy", {
          font: "colossal",
          horizontalLayout: "default",
          verticalLayout: "default",
          width: 80,
          whitespaceBreak: true,
        })
      )
    );
    console.log();
    console.log(colors.green(" Mineflayer Discord Bot"));
    console.log(colors.green(" Created by OBNinjaa"));
    console.log(colors.green(" dsc.gg/mineflayer"));
  }
}

module.exports = Ready;
