const Discord = require("discord.js");
const { QuickDB } = require('quick.db')
const db = new QuickDB()
const Schema = require("../../database/Schemas/User");
module.exports = {
    name: "dep-all",
    description: "Depositar  Dinheiro do usuario",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [],
    run: async (client, interaction) => {
        let userdb2 = await Schema.findOne({ userId: interaction.user.id });

        let Money = userdb2.money
        if (Money === 0) {
            interaction.reply({ content: `você não tem dinheiro` })
            return;
        }

        interaction.reply({
            content: `${Money} foi depositando`
        })
        if (!userdb2) {
            const newuser = new client.userdb({ userId: interaction.user.id });
            await newuser.save();
            userdb2 = await Schema.findOne({ userId: interaction.user.id });
        }
        userdb2.money = userdb2.money - Money; userdb2.save();
        userdb2.bank = userdb2.bank + Money; userdb2.save();

    }

}