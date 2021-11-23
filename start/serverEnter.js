const Discord = require('discord.js');
const db = require('../config/db')

  module.exports = {
      name: 'serverEnter',
      description: "",
      async execute(guild) {
        const guild_id = guild.id;
        let channelFound = guild.channels.cache.find((channel) => channel.name === `disguardconfig`);
    
        try {
            if (!channelFound) {
                channelFound = await guild.channels.create(`disguardconfig`, { 
                    type: 'text',
                    deny: [
                        Discord.Permissions.FLAGS.VIEW_CHANNEL,
                    ]
                })
            }
        } catch (err) {
            console.log(err)
        }

        console.log(channelFound);
        db.query(`SELECT * FROM server_config WHERE guild_id = "${guild_id}";`, (err, rows, fields) => {
            if(err) throw err;
            if (rows[0]) {
                console.log("Guild already in DB");
                channelFound.send(`The server is already in our Database`)             
            } else {
                try {
                    db.query(`INSERT INTO server_config (guild_id) VALUES ("${guild_id}");`);
                    channelFound.send(`This guild has been inserted in our Database`)
                } catch (err) {
                    console.log(err);
                    channelFound.send(`An error occured while trying to insert your guild in our Database!`)
                }
            }
        });    
    }
  }