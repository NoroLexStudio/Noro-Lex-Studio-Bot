const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: 'deposit',
    aliases: ['dep'],
    category: 'Economy',
    utilisation: '{prefix}deposit [amount]',
    execute(bot, message, args) {

        let user = message.author;

        let member = db.fetch(`money_${message.guild.id}_${user.id}`)

        if (args[0] == 'all') {
            let money = db.fetch(`money_${message.guild.id}_${user.id}`)

            let embedbank = new MessageEmbed()
                .setColor('#ff0000')
                .setDescription("❌ You don't have any money to deposit")

            if (!money) return message.channel.send(embedbank)

            db.subtract(`money_${message.guild.id}_${user.id}`, money)
            db.add(`bank_${message.guild.id}_${user.id}`, money)
            let sembed = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`✅ You have deposited all your coins into your bank`);
            message.channel.send(sembed)

        } else {

            let embed2 = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`❌ Specify an amount to deposit`);

            if (!args[0]) {
                return message.channel.send(embed2)
                    .catch(err => message.channel.send(err.message))
            }
            let embed6 = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`❌ Your Amount Is Not A Number!`)

            if(isNaN(args[0])) {
                return message.channel.send(embed6)
            
            }
            let embed3 = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`❌ You can't deposit negative money`);

            if (message.content.includes('-')) {
                return message.channel.send(embed3)
            }
            let embed4 = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`❌ You don't have that much money`);

            if (member < args[0]) {
                return message.channel.send(embed4)
            }

            let embed5 = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`✅ You have deposited ${args[0]} coins into your bank`);

            message.channel.send(embed5)
            db.subtract(`money_${message.guild.id}_${user.id}`, args[0])
            db.add(`bank_${message.guild.id}_${user.id}`, args[0])

        }
    }
};