const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, GlobalFonts, loadImage } = require('@napi-rs/canvas');

module.exports = {
    
        name:'lolilicense',
        description:'get a qualified loli license',
        options:[],
		
run:async (client, interaction)=> {
        await interaction.deferReply();
        const user = interaction.user.username;

        const canvas = createCanvas(1080, 611);
        const context = canvas.getContext('2d');
		GlobalFonts.registerFromPath('src/data/media/fonts/GOTHICB.TTF', 'Century Gothic');
        // Canvas.registerFont('src/data/media/fonts/GOTHICB.TTF', { family: 'Century Gothic' });

        const lolilicense = await loadImage('src/data/media/images/license.jpg');
        context.drawImage(lolilicense, 0, 0, canvas.width, canvas.height);

        context.font = '20pt "Century Gothic"';
        context.fillStyle = '#000000';

        context.fillText(user, 450, 128);


        const attachment = new AttachmentBuilder(await canvas.encode('jpeg'), { name: 'lolilicense.jpg' });
        interaction.editReply({ files: [attachment] });
    },
};
