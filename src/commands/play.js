import { EmbedBuilder } from 'discord.js';

function musicPlay(client, message, args) {
    client.distube.play(message.member.voice.channel, args.join(' '), {
        member: message.member,
        TextChannel: message.channel,
        message,
    })
}

export { musicPlay };