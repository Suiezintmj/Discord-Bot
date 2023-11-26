// em teste
const Discord = require("discord.js")
const Schemas = require("../../database/Schemas/User")
function getLocalizedString(userId, stringKey) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await Schemas.findOne({ userId });
            if (!user) {
       
                const languageStrings = require(`../../languages/pt-br.json`);
                resolve(languageStrings[stringKey]);
            } else {
              
                const languageStrings = require(`../../languages/${user.language}.json`);
                resolve(languageStrings[stringKey]);
            }
        } catch (error) {
            reject(error);
        }
    });
}

module.exports ={
    name:"set-language",
    description: 'Define o idioma do bot para o usuário',
    options: [
        {
            name: 'language',
            description: 'Escolha o idioma que você quer definir para o bot.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'Português',
                    value: 'pt-br',
                },
                {
                    name: 'Inglês',
                    value: 'en-US',
                },
            ],
        },
    ],
    run: async(client, interaction, args) => {
        const userId = interaction.user.id;
        const language = interaction.options.getString('language');

        let user = await Schemas.findOne({ userId });
        if (user) {
            user.language = language;
            await user.save();
        } else {
            const newUser = new Schemas({
                userId: userId,
                language: language,
            });
            await newUser.save();
        }

       
        const greeting = await getLocalizedString(userId, 'greeting');
        interaction.reply(`${greeting}, ${interaction.user.username}!`);
    },
};