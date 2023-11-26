const Discord = require("discord.js")
const Schema = require("../../database/Schemas/User");
module.exports = {
    name: 'add-money', 
    description: '[Economia] Adicione dabloons a um usuário', 
    options: [
     
        {
            name: 'quantidade', 
            description: 'Quantidade de dabloons a adicionar', 
            type: Discord.ApplicationCommandOptionType.String,
            required: true 
        }
    ], 
    run: async(client, interaction, args) => {

    
        const amount = interaction.options.getString('quantidade'); 
        let data = await  Schema.findOne({ userId: interaction.user.id });
        data.bank = data.bank + amount; 
        data.save();
    
        interaction.reply({ content: `Foi adicionado ${amount} de Money ao ${interaction.user}!`, ephemeral: false });

    } 
}