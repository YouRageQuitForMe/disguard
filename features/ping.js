const Discord = require('discord.js');

  module.exports = {
      name: 'ping',
      permission: 3,
      description: "Serve a testare",
      execute(message) {
            message.reply({
                content: 'pong'
            })
    }
  }