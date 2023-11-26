const schema = require("../../database/Schemas/User");
const Discord = require("discord.js")
module.exports = {
    name: "sacar",
    description: "Sacar dinheiro do banco",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "quantia",
            type: Discord.ApplicationCommandOptionType.Number,
            description: "Coloque uma quantia para pagar.",
            required: true
        }

    ],

    run: async (client, interaction) => {
        let data = await schema.findOne({
            userId: interaction.user.id,
        });

        if (!data) {
            await interaction.reply({
                content: "Ocorreu um erro ao executar este comando...",
                ephemeral: true,
            });
        }


        let quantia = interaction.options.getNumber("quantia");
        let dinheiro = data.bank
        if (dinheiro === undefined) dinheiro = 0;

        let embed = new Discord.EmbedBuilder()
            .setTitle(`\`Error\``)
            .setColor("23006e")
            .setDescription(`Você não possui \`${quantia}\` moedas, possui apenas \`${dinheiro}\` moedas.`)

        let embed2 = new Discord.EmbedBuilder()
            .setTitle(`Você pegou dinhero Do banco`)
            .setColor("23006e")
            .setDescription(`Você sacou \`${quantia}\` moedas com sucesso.`)


        if (quantia > dinheiro) {
            interaction.reply({ embeds: [embed] });
            return;
        } 
        
            data.money = data.money + quantia;
            data.bank = data.bank - quantia;
            await data.save();

            interaction.reply({ embeds: [embed2] })
        

    }
}

