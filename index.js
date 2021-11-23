require('dotenv').config();
const Discord = require('discord.js');
const {Intents, Collection} = require('discord.js')
const fs = require('fs');
const PREFIX = process.env.PREFIX;
const connection = require('./config/db')

    connection.connect((err) => {
        if (err) {
          return console.error('error: ' + err.message);
        }
      
        console.log('Connected to the MySQL server.');
      });

const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
});

client.commands = new Collection();


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

const TOKEN = process.env.TOKEN;
client.login(TOKEN);


const features = fs.readdirSync('./features/').filter(js => js.endsWith('.js'));
features.forEach(feature => {
    const newFeature = require(`./features/${feature}`);
    client.commands.set(newFeature.name, newFeature);
})
const startFiles = fs.readdirSync('./start/').filter(js => js.endsWith('.js'));
startFiles.forEach(startFile => {
    const newStartFile = require(`./start/${startFile}`);
    client.commands.set(newStartFile.name, newStartFile);
})

client.on('messageCreate', async (message) => {
    for (command of client.commands) {
        if (message.content.toLowerCase().startsWith(`${PREFIX}${command[1].name}`))
            command[1].execute(message)
    }
})

client.on('guildMemberAdd', async (member) => {
    client.commands.get('joinMessage').execute(member)
})

client.on('guildCreate', async (guild) => {
  //  console.log(guild);
    client.commands.get('serverEnter').execute(guild)
})
