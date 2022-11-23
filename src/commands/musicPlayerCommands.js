function musicPlayerCmmd(client, message, args, commd, queue) {
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
}

export { musicPlayerCmmd };

/*  If we use only "export" we need to use curly brackets in import.
    But if we use "export default", we don't use curly brackets in import
*/