import { EmbedBuilder } from 'discord.js';

function musicStop(message, queue2) {
    if (!queue2) {
        message.channel.send(`There is nothing in the queue right now!`)
        return;
    } 
    queue2.stop()
    message.channel.send(`Stopped!`)
}

export { musicStop };