import { config } from 'dotenv';
import { Client, GatewayIntentBits, Routes, TextChannel } from 'discord.js';
import { REST } from '@discordjs/rest';
import { DisTube } from 'distube';
import { musicPlayerCmmd } from './commands/musicPlayerCommands.js'
import { messageRead } from './commands/messageReadCommand.js'
import { Command_init } from './commands/Command_init.js'
import { EmbedBuilder } from 'discord.js';

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

const status = queue =>
    `Volume: \`${queue.volume}%\``
/*
const status = queue =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
    }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
*/

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
        console.log(`\nServer Name: ${message.guild.name}`);
        console.log(`Text Channel: ${message.channel.name}`);
        console.log(`${message.author.username}: ${message.content}`);
        console.log(message.createdAt.toLocaleString('tr', dateoptions));
    }
    if (message.author.bot || !message.guild) return;
    const prefix = "!"
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    const queue2 = client.distube.getQueue(message)
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const commd = args.shift().toLowerCase() 
    musicPlayerCmmd(client, message, args, commd, queue2);
    mssgRead = messageRead(message, commd, mssgRead);
})

client.distube
    .on('playSong', (queue, song) => {
        /*
        const embedmssg = new EmbedBuilder()
            .setTitle('Title')
            .setColor('#8fda81')
            .setThumbnail(song.thumbnail);
        queue.textChannel.send({ embeds: [embedmssg] });*/
        queue.textChannel.send(`Now Playing: ${song.name} | Duration: \`${song.formattedDuration}\` | Requested by ${song.user} \n${status(queue)}`)
        }
    )
    .on('addSong', (queue, song) => {
        queue.textChannel.send(
        `Added to queue: ${song.name} | Duration: \`${song.formattedDuration}\` | Requested by ${song.user}`)
        }
    )

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
  
Command_init(rest, CLIENT_ID, GUILD_ID_LK);

client.login(QUEEN_TOKEN);