import { EmbedBuilder } from 'discord.js';

function help(message, commd) {
    if(commd === 'help'){
        const embedmssg2 = new EmbedBuilder()
        .setTitle('Commands List')
        .setColor('#1a9c9c')
        .addFields(
            { name: 'Music Player Commands', value: '\`!play\`, \`!stop\`, \`!skip\`, \`!pause\`, \`!resume\`, \`!volume\`, \`!queueinfo\`' },
        )
        .setTimestamp()
        message.channel.send({ embeds: [embedmssg2] });
    }
}

export { help };
