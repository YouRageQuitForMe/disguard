const Discord = require('discord.js');
const db = require('../config/db');

  module.exports = {
      name: 'joinMessage',
      description: "Configure your custom join message",
      execute(member) {
        // const channel = member.guild.channels.cache.find(channel => channel.name === 'welcome')
        // channel.send('Everybody say welcome to @' + member.user.username + '#' + member.user.discriminator)
         console.log(member.guild.id)

        const guild_id = member.guild.id;
        
        db.query(`SELECT * FROM server_config WHERE guild_id = "${guild_id}";`, (err, rows, fields) => {
              if(err) throw err;
              console.log(rows);
              if (rows[0]) {

                try {
                  const channel = member.guild.channels.cache.find(channel => channel.name === rows[0].join_channel);
                  channel.send(`Hey ${member.user.username}, ${rows[0].join_message}`)
                } catch (err) {
                    console.log(err);
                }


              } 
         });    



            
    }
  }