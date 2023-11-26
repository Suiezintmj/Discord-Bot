const Discord = require("discord.js");
const schema = require("../../database/Schemas/User");

const ms = require("ms");
const cooldowns = {}


module.exports = {
    name: "daily",
    description: "Resgate seu dinheiro diário.",
    type: Discord.ApplicationCommandType.ChatInput,
    run: async (client, interaction) => {

        let data = await schema.findOne({ userId: interaction.user.id })



        let quantia = Math.ceil(Math.random() * 5000)
        const embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setDescription("Click no botão para resgata seus Mkcoins")
        const Button = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("Daily")

                    .setLabel("Daily")
                    .setStyle(2)
            )

        interaction.reply({ embeds: [embed], components: [Button], ephemeral: true })


        const resgatou = new Discord.EmbedBuilder()
            .setColor("Green")
            .setTitle("Você coletou sua recompensa diária!")
            .setDescription(`\n 
        <​a:y_nubank2RFE:899874315263172608> Coletado: **\`R$${quantia}\`**`)


        const filtro = i => i.customId === "Daily" && i.user.id === interaction.user.id;
        const coletor = interaction.channel.createMessageComponentCollector({ filtro, time: 100000 });
        coletor.on('collect', async i => {
            if (i.customId === "Daily") {
                let timeout = ms("1 days")

                if (timeout - (Date.now() - data.cooldowns.daily) > 0) {
                    let time = ms(timeout - (Date.now() - data.cooldowns.daily))
                    let resta = [time.seconds, 'segundos'];
                    if (resta[0] == 0) resta = ['alguns', 'millisegundos']
                    if (resta[0] == 1) resta = [time.seconds, 'segundo']
                    i.update({
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setColor("Red")
                                .setDescription(`Espere \`${time}\` para poder resgatar seu daily novamente!`)
                        ], ephemeral: true
                    })
                    return;
                }
                    data.cooldowns.daily = Date.now();
                    data.bank += quantia * 1;
                    await data.save();

                    i.update({ embeds: [resgatou], ephemeral: true })
                
            }
        }
        )
    }
}
