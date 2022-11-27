import { EmbedBuilder } from 'discord.js';

function musicResume(message, queue2) {
    if (!queue2) {
        message.channel.send(`There is nothing in the queue right now!`)
        return;
    } 
    if (queue2.paused) {
        queue2.resume()
        message.channel.send('Resumed!')
    } else {
        message.channel.send('The queue is not paused!')
    }
}

export { musicResume };
