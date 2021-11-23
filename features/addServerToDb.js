const Discord = require('discord.js');
const db = require('../config/db');

  module.exports = {
      name: 'resetconfig',
      description: "Crea un annuncio ",
      async execute(message) {
        const guild_id = message.guildId;
  
      await message.reply({ content: 'Do you really wanna delete your server config?' });
        
        db.query(`SELECT * FROM server_config WHERE guild_id = "${guild_id}";`, (err, rows, fields) => {
              if(err) throw err;
            //   rows = JSON.stringify(rows);
              if (rows[0]) {
                  message.reply({content: "This guild is already registered in our database"})
              } else {
                try {
                    db.query(`INSERT INTO server_config (guild_id) VALUES ("${guild_id}");`);
                    message.reply({
                        content: "Your server has been successfully added to our Database!"
                    })
                } catch (err) {
                    console.log(err);
                    message.reply({
                        content: "An error has occured trying to insert your server in our database!"
                    })
                }
               }
         });    
    }
  }  


