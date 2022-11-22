import { config } from 'dotenv';
import { Client, GatewayIntentBits, Routes, TextChannel } from 'discord.js';
import { REST } from '@discordjs/rest';
import { DisTube } from 'distube';

config();

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
    /*console.log(`\nSend From: ${message.channelId}`);
    console.log(`\n${message.author.username}: ${message.content}`);
    console.log(message.createdAt.toUTCString());*/
    const mssgRead = false
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
    /*
    if(commd === 'messageReadOn'){
        if (mssgRead === false){
            message.channel.send(`Message log activated!`)
            mssgRead = true
        } else {
            message.channel.send(`Message log is already active!`)
        }
    }
    if(commd === 'messageReadOff'){
        if (mssgRead === true){
            message.channel.send(`Message log deactivated!`)
            mssgRead = false
        } else {
            message.channel.send(`Message log is already deactive!`)
        }
    }
    if(mssgRead === true){
        console.log(`\n${message.author.username}: ${message.content}`);
        console.log(message.createdAt.toUTCString());
    } else {
        message.channel.send(`Message log is deactive!`)
    }*/
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
            //case y:
              // code block
              //break;
            default:
                interaction.reply('Merhaba!');
        }
        /*console.log(interaction.user.id);*/
        
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