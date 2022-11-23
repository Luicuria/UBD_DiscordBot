function messageRead(message, commd, mssgRead) {
    if(commd === 'messagereadon'){
        if (!mssgRead){
            message.channel.send(`Message log activated!`)
            return mssgRead = true
        } else {
            message.channel.send(`Message log is already active!`)
        }
    }
    if(commd === 'messagereadoff'){
        if (mssgRead){
            message.channel.send(`Message log deactivated!`)
            return mssgRead = false
        } else {
            message.channel.send(`Message log is already deactive!`)
        }
    } 
}

export { messageRead };
