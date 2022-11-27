import { EmbedBuilder } from 'discord.js';

function musicVolume(message, args, queue2) {
    if (!queue2) {
        message.channel.send(`There is nothing in the queue right now!`)
        return;
    } 
    const volume = parseInt(args[0]) 
    if (isNaN(volume)) {
        message.channel.send(`Please enter a valid number!`)
        return;
    }
    queue2.setVolume(volume)
    message.channel.send(`Volume set to \`${volume}\``)
}

export { musicVolume };
