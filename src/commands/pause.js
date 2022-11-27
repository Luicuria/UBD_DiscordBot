import { EmbedBuilder } from 'discord.js';

function musicPause(message, queue2) {
    if (!queue2) {
        message.channel.send(`There is nothing in the queue right now!`)
        return;
    } 
    if (!queue2.paused) {
        queue2.pause()
        message.channel.send('Paused!')
    } else {
        message.channel.send('The song is not playing!')
    }
}

export { musicPause };
