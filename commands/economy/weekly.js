const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
        
module.exports = {
    name: 'weekly',
    aliases: ['week'],
    category: 'Economy',
    utilisation: '{prefix}weekly',
    execute(bot, message, args) {

        let user = message.author;
        let timeout = 604800000;
        let amount = 5000;

        let weekly = db.fetch(`weekly_${user.id}`);

        if (weekly !== null && timeout - (Date.now() - weekly) > 0) {

            let timeEmbed = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`❌ You have already collected your weekly reward\n\n`);
            message.channel.send(timeEmbed)
        } else {
            let moneyEmbed = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`✅ You've collected your weekly reward of ${amount} coins`); 
            message.channel.send(moneyEmbed)
            db.add(`money_${user.id}`, amount)
            db.set(`weekly_${user.id}`, Date.now())


        }
    }
};