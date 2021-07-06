const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'leaderboard',
    aliases: ['top'],
    category: 'Economy',
    utilisation: '{prefix}leaderboard',
        
    execute(bot, message, args) {
    	
        let money = db.all().filter(data => data.ID.startsWith(`money_`)).sort((a, b) => b.data - a.data);
        if (!money.length) {
            let noEmbed = new MessageEmbed()
                .setAuthor(message.member.displayName, message.author.displayAvatarURL())
                .setColor("#ff0000")
                .setFooter("Nothing To See Here Yet!")
            return message.channel.send(noEmbed)
        };

        money.length = 10;
        var finalLb = "";
        for (var i in money) {
            if (money[i].data === null) money[i].data = 0
            finalLb += `**${money.indexOf(money[i]) + 1}. ${bot.users.cache.get(money[i].ID.split('_')[1]) ? bot.users.cache.get(money[i].ID.split('_')[1]).tag : "Unknown User#0000"}** - ${money[i].data} :dollar:\n`;
        };

        const embed = new MessageEmbed()
            .setTitle(`Leaderboard`)
            .setColor("#ff0000")
            .setDescription(finalLb)
            .setFooter(bot.user.tag, bot.user.displayAvatarURL())
            .setTimestamp()
        message.channel.send(embed);
    }
};

