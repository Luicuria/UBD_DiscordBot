import { config } from 'dotenv';
import { Client, GatewayIntentBits, Routes, TextChannel } from 'discord.js';
import { REST } from '@discordjs/rest';
import { DisTube } from 'distube';

config();
const dateoptions = {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    hour12: false,
    minute: 'numeric'
}

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
	],
});

const QUEEN_TOKEN = process.env.QUEEN_BOT_TOKEN;
const CLIENT_ID  = process.env.CLIENT_ID;
const GUILD_ID_LK  = process.env.GUILD_ID_LK;
const UBD_ID  = process.env.UBD_ID;
var mssgRead = false
const rest = new REST({ version: '9' }).setToken(QUEEN_TOKEN);

client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
})

client.on('ready', () => {
    console.log(`${client.user.username} is logged in!`);
});

client.on('messageCreate', (message) => {
    if(mssgRead === true){
        console.log(`\nMetin Kanalı: ${message.channel.name}`);
        console.log(`${message.author.username}: ${message.content}`);
        console.log(message.createdAt.toLocaleString('tr', dateoptions));
    }
    if (message.author.bot || !message.guild) return;
    const prefix = "!"
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    const queue = client.distube.getQueue(message)
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const commd = args.shift().toLowerCase() 
    if(commd === 'play'){
        client.distube.play(message.member.voice.channel, args.join(' '), {
            member: message.member,
            TextChannel: message.channel,
            message,
        })
    }
    if(commd === 'stop'){
        if (!queue) {
            message.channel.send(`There is nothing in the queue right now!`)
            return;
        } 
        queue.stop()
        message.channel.send(`Stopped!`)
    }
    if(commd === 'skip'){
        if (!queue) {
            message.channel.send(`There is nothing in the queue right now!`)
            return;
        } 
        try {
            queue.skip()
            message.channel.send(`Skipped!`)
        } catch (e) {
            message.channel.send(`Error: ${e}`)
        }
    }
    if(commd === 'pause'){
        if (!queue) {
            message.channel.send(`There is nothing in the queue right now!`)
            return;
        } 
        if (!queue.paused) {
            queue.pause()
            message.channel.send('Paused!')
        } else {
            message.channel.send('The song is not playing!')
        }
          
    }
    if(commd === 'resume'){
        if (!queue) {
            message.channel.send(`There is nothing in the queue right now!`)
            return;
        } 
        if (queue.paused) {
            queue.resume()
            message.channel.send('Resumed!')
        } else {
            message.channel.send('The queue is not paused!')
        }
    }
    if(commd === 'messagereadon'){
        if (!mssgRead){
            message.channel.send(`Message log activated!`)
            mssgRead = true
        } else {
            message.channel.send(`Message log is already active!`)
        }
    }
    if(commd === 'messagereadoff'){
        if (mssgRead){
            message.channel.send(`Message log deactivated!`)
            mssgRead = false
        } else {
            message.channel.send(`Message log is already deactive!`)
        }
    }  
})

client.distube.on('playSong', (queue, song) => {
    queue.textChannel.send(`Now Playing: ${song.name}`)
})

client.on('interactionCreate', (interaction) => {
    if (!interaction.isCommand()) return;
  
    if (interaction.commandName === 'ping') {
        switch(interaction.user.id) {
            case UBD_ID:
                interaction.reply('Hail to the King, Hail to the One!');
                break;
            default:
                interaction.reply('Merhaba!');
        }
    }
});
  

async function Command_init() {

    const commands = [{
        name: 'ping',
        description: 'Bot replies'
        }
    ];
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID_LK),
            { body: commands },
        );
    } catch (error) {
        console.error(error);
    }
}

Command_init();

client.login(QUEEN_TOKEN);