const Discord = require("discord.js");
const db = require("../config/db");

module.exports = {
  name: "sjm",
  description: "Crea un annuncio ",
  execute(message) {
    const guild_id = message.guildId;

    let str = message.content.split(" ");
    str.shift();

    const channel = str.shift();

    db.query(
      `SELECT * FROM server_config WHERE guild_id = "${guild_id}";`,
      (err, rows, fields) => {
        if (err) throw err;
        //   rows = JSON.stringify(rows);
        if (!rows[0]) {
          message.reply({
            content: `This guild is not registered in our database, use ${process.env.PREFIX}configstart`,
          });
        } else {

          try {

            const res = db.query(
              `UPDATE server_config SET join_message = "${str.join(" ")}",
               join_channel = "${channel}" WHERE guild_id = "${guild_id}";`
            );
            message.reply({ content: "JoinMessage set" });

          } catch (err) {
            console.log(err);
            message.reply({
              content: "An error has occured trying to set the join message!",
            });

          }
        }
      }
    );
  },
};
