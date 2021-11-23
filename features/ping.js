const Discord = require('discord.js');

  module.exports = {
      name: 'ping',
      description: "Crea un annuncio personalizzato",
      execute(message) {
            message.reply({
                content: 'pog'
            })
    }
  }