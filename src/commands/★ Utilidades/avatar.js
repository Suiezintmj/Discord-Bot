const { ActionRowBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
module.exports = {
    name: "avatar",
    description: "Mostra o avatar do seu perfil ou de outro usuário",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "mencione um usuario",
            type: Discord.ApplicationCommandOptionType.User,
        }
    ],
    run: async (client, interaction) => {
        const user = interaction.options.getUser("user") || interaction.user;
        let avatar = user.avatarURL({ format: 'png', dynamic: true, size: 2048 });
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle(`🖼 ${user.username}`)
                        .setColor("Random")
                        .setImage(avatar)
                ],

            })
        }
    }