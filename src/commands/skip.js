import { EmbedBuilder } from 'discord.js';

function musicSkip(message, queue2) {
    if (!queue2) {
        message.channel.send(`There is nothing in the queue right now!`)
        return;
    } else if (!(queue2.songs[1])) {
        queue2.stop()
        message.channel.send(`Skipped!`)
    } else {
        try {
            queue2.skip()
            message.channel.send(`Skipped!`)
        } catch (e) {
            message.channel.send(`${e}`)
        }
    }   
}

export { musicSkip };