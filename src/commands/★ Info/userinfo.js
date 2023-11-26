const Discord = require("discord.js")
const moment = require('moment')
const Canvas = require('canvas')
moment.locale('pt-BR');

const { profileImage } = require("discord-arts");

module.exports = {
    name: 'user-info',
    description: 'Veja infos de um usuário',

    options: [
    ],

    run: async (client, interaction, args) => {
        let user = interaction.user;

        const server = interaction.guild.members.cache.get(user.id);
        let presence;
        if (!server.presence.activities) presence = "Nenhum";
        else presence = server.presence.activities.join(", ");
        let avatar = user.avatarURL({ format: 'png', dynamic: true, size: 2048 });
        let data_conta = `<t:${~~(new Date(user.createdAt) / 1000)}:R>`;
        let servidor = `**<t:${~~(new Date(server.joinedAt) / 1000)}:R>**`
        const userFlags = await user.flags.toArray();
        let flag2 = require("../../utils/Emojis");


        let bufferImg = await profileImage(user.id);
        let imgAttachment = new Discord.AttachmentBuilder(bufferImg, { name: "profile.png" });

        let embed = new Discord.EmbedBuilder()
            .setColor("#37373b")


            .setDescription(`**${user.username}**`)
            .setThumbnail(avatar)
            .setColor('Random')
            .setFields(
                {
                    name: "🍭 Nome de usuário : ",
                    value: ` ${user.username}`,
                    inline: true
                },
                {
                    name: "**🔱 Tag**",
                    value: `${user.discriminator}`,
                    inline: true
                },
                {
                    name: "**️⚠️ ID**",
                    value: ` ${user.id}`,


                },
                {
                    name: "📌 | Status",
                    value: `\`\`\`${presence}\`\`\``,
                },
                {
                    name: "**🔰 Emblemas** ",
                    value: `${userFlags.length ? userFlags.map(flags => flag2[flags]).join(' ') : 'None'}`,
                    inline: true

                },
                {
                    name: "**📌 Criada em**",
                    value: `${data_conta}`,
                },

                {
                    name: "**🌐 Entrou aqui em**",
                    value: `${servidor}`,
                },

            )


            .setImage(`attachment://profile.png`)




        interaction.reply({
            embeds: [embed], files: [imgAttachment], components: [new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setLabel('Abrir avatar no navegador')
                        .setURL(avatar)
                        .setStyle(5)
                )]
        })
    }
}
