const Discord = require("discord.js")
const Guild = require("../../database/Schemas/Guild")
const chalk = require("chalk")

module.exports = {
    name: "guildMemberAdd",

    async execute(client, member, interaction) {
        let guilddb = await Guild.findOne({
            idS: member.guild.id,
          });
        let role = member.guild.roles.cache.get(guilddb.autorole.autoRole);

        if (!role) {
            console.log("Erro")
            return;
        } else {
            member.roles.add(role).then(() => {
                console.log(`${chalk.blueBright(`[AUTO ROLE]`)} ${chalk.magentaBright(`${member.user.tag} entrou em [ ${member.guild.name} ]`)}`)

            })
        }
    }
}