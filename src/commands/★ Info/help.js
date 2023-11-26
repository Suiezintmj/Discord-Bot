const { SelectMenuBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require('discord.js')
const fs = require('fs')

module.exports = {
    name: 'help',
    description: 'Comando de help',
    run: async (client, interaction) => {

        const optionsArr = []

        const commandsFolder = fs.readdirSync('./src/commands')
        for (const category of commandsFolder) {
            optionsArr.push({ label: `${category}`, description: `Veja os comandos de ${category}`, value: `${category}` })
        }

        const embed = new EmbedBuilder()
        .setTitle('Central de Ajuda')
        .setColor('#303136')
        .setDescription('Clique em uma das opções abaixo para ver meus comandos.')

        const menu = new ActionRowBuilder()
        .setComponents(
            new SelectMenuBuilder()
            .setCustomId('menu-help')
            .addOptions(optionsArr)
        )
        new ButtonBuilder()
        .setCustomId("Convida")
        .setLabel("🤖 Me adicione:")
        .setStyle(5)
 

        await interaction.reply({ embeds: [embed], components: [menu] }).then(async (msg) => {
            const filter = (m) => m.user.id == interaction.user.id
            const collector = msg.createMessageComponentCollector({ filter, time: 60000 })

            collector.on('collect', async (i) => {
                i.deferUpdate();
                const selected = i.values[0]
                const commandsArr = []
                const commandsFiles = fs.readdirSync(`./src/commands/${selected}`)

                for (const command of commandsFiles) {
                    if (command.endsWith('.js')) {
                        commandsArr.push(command.replace(/.js/g, ''))
                    }
                }

                embed.setDescription(`Veja os comandos da categoria ${selected}`)
                embed.setFields([
                    { name: 'Comandos (/)', value: `\`\`\`${commandsArr.join(', ')}\`\`\`` }
                ])
                interaction.editReply({ embeds: [embed] })
            })
        })

    }
}