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
}

export { musicPlayerCmmd };

/*  If we use only "export" we need to use curly brackets in import.
    But if we use "export default", we don't use curly brackets in import
*/