const Discord = require('discord.js')

module.exports = {
    name: "delete",
    description: "delete um canal",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "canal",
            description: "selecione o canal",
            type: Discord.ApplicationCommandOptionType.Channel,
        },

    ],
    run: async (clinet, interaction) => {
        let info = {
            canal: interaction.options.getChannel('canal')|| interaction.channel,
            Permissions: interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)
        }
        if (!info.Permissions) return interaction.replay({ content: `Você não tem permissão para usar este comando`, ephermal: true })
        interaction.reply({ content: `o canal ${info.canal.name} foi deletado por ${interaction.user}` })
        info.canal.delete().catch(er => {
            console.log(er);
        })
    }
}