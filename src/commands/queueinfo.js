import { EmbedBuilder } from 'discord.js';

function musicQueueInfo(message, queue2) {
    if (!queue2) {
        message.channel.send(`There is nothing in the queue right now!`)
        return;
    }
    try {
        var arr = new Array(100)
        var temp
        for (let i = 0; i != -1; i++) {
            if (typeof queue2.songs[i] === 'undefined') break;
            arr[i] = queue2.songs[i].name
            temp = i
        }
        const embedmssg2 = new EmbedBuilder()
        .setTitle('Queue')
        .setColor('#1a9c9c')
        .addFields(
        { name: '\u200B', value: '\u200B' },
        )
        .setTimestamp()
        //console.log(arr)
        for (let i = 0; i != -1; i++) {
            if (typeof arr[i] === 'undefined') break;
            if (i === 0) {//https://stackoverflow.com/questions/66511691/how-to-create-an-embed-with-a-certain-number-of-fields-from-a-number
                embedmssg2.addFields({ name: `Song Playing:`, value: `${arr[i]}`})
            } else {
                embedmssg2.addFields({ name: `${i}. Song:`, value: `${arr[i]}`})
            }  
        }
        message.channel.send({ embeds: [embedmssg2] });
        /*
        for (let i = 0; i != -1; i++) {
            if (typeof queue2.songs[i] === 'undefined') break;
            //console.log(queue2.songs[i])
            message.channel.send(`${i+1}. Song: \`${queue2.songs[i].name}\` | Duration: \`${queue2.songs[i].formattedDuration}\``)
        }*/
    } catch (e) {
        message.channel.send(`${e}`)
    }
}

export { musicQueueInfo };
