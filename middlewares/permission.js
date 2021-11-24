const Discord = require('discord.js');
const {Permissions} = require('discord.js');
const commands = require('../index')

const hasPermission = (message, permissionRequired) => {

    switch(permissionRequired) {
        case 0:
            command[1].execute(message);
            break;

        case 3:
            if (message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) {
                command[1].execute(message);
            } else {
                message.reply({content: "You're not an admin!"}).then(msg => {
                    setTimeout(() => {msg.delete(); message.delete()}, 3000)
                })
                    .catch(err => console.log(err)); 
            }
            break;

    }
}

module.exports = hasPermission;