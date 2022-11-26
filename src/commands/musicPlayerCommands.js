import { EmbedBuilder } from 'discord.js';

function musicPlayerCmmd(client, message, args, commd, queue2) {
    if(commd === 'play'){
        client.distube.play(message.member.voice.channel, args.join(' '), {
            member: message.member,
            TextChannel: message.channel,
            message,
        })
    }
    if(commd === 'stop'){
        if (!queue2) {
            message.channel.send(`There is nothing in the queue right now!`)
            return;
        } 
        queue2.stop()
        message.channel.send(`Stopped!`)
    }
    if(commd === 'skip'){
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
    if(commd === 'pause'){
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
    if(commd === 'resume'){
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
    if(commd === 'volume'){
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
    if(commd === 'queueinfo'){
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
}

export { musicPlayerCmmd };

/*  If we use only "export" we need to use curly brackets in import.
    But if we use "export default", we don't use curly brackets in import
*/