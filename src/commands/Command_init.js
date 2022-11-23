import { Routes } from 'discord.js';
async function Command_init(rest, CLIENT_ID, GUILD_ID_LK) {

    const commands = [{
        name: 'ping',
        description: 'Bot replies'
        }
    ];
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID_LK),
            { body: commands },
        );
    } catch (error) {
        console.error(error);
    }
}

export { Command_init };