const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

    module.exports = {
    name: 'roulette',
    aliases: [],
    category: 'Economy',
    utilisation: '{prefix}roulette [color] [amount]',
    execute(bot, message, args) {
        let prefix = "!n "
        let fetched = db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            fetched = prefix
        } else {
            prefix = fetched
        }
      
        let user = message.author;

        function isOdd(num) {
            if ((num % 2) == 0) return false;
            else if ((num % 2) == 1) return true;
        }

        let colour = args[0];
        let money = parseInt(args[1]);
        let moneydb = db.fetch(`money_${message.guild.id}_${user.id}`)

        let random = Math.floor((Math.random() * 10));

        let moneyhelp = new MessageEmbed()
            .setColor("#ff0000")
            .setDescription(`❌ Specify an amount to gamble | ${prefix}roulette <color> <amount>`);

        let moneymore = new MessageEmbed()
            .setColor("#ff0000")
            .setDescription(`❌ You are betting more than you have`);

        let colorbad = new MessageEmbed()
            .setColor("#ff0000")
            .setDescription(`❌ Specify a color | Red [1.5x] (normal) Black [2x] (hard) Green [15x] (very hard)`);

        if (!colour) return message.channel.send(colorbad);
        colour = colour.toLowerCase()
        if (!money) return message.channel.send(moneyhelp);
        if (money > moneydb) return message.channel.send(moneymore);

        if (colour == "b" || colour.includes("black")) colour = 0;
        else if (colour == "r" || colour.includes("red")) colour = 1;
        else if (colour == "g" || colour.includes("green")) colour = 2;
        else return message.channel.send(colorbad);

        if (random == 1 && colour == 2) { // Green
            money *= 15
            db.add(`money_${user.id}`, money)
            let moneyEmbed1 = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`✅ You won ${money} coins\n\nMultiplier: 15x`);
            message.channel.send(moneyEmbed1)
        } else if (isOdd(random) && colour == 1) { // Red
            money = parseInt(money * 1.5)
            db.add(`money_${message.guild.id}_${user.id}`, money)
            let moneyEmbed2 = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`🔴 You won ${money} coins\n\nMultiplier: 1.5x`);
            message.channel.send(moneyEmbed2)
        } else if (!isOdd(random) && colour == 0) { // Black
            money = parseInt(money * 2)
            db.add(`money_${message.guild.id}_${user.id}`, money)
            let moneyEmbed3 = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`⬛ You won ${money} coins\n\nMultiplier: 2x`);
            message.channel.send(moneyEmbed3)
        } else { // Wrong
            db.subtract(`money_${message.guild.id}_${user.id}`, money)
            let moneyEmbed4 = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`❌ You lost ${money} coins\n\nMultiplier: 0x`);
            message.channel.send(moneyEmbed4)
        }
          db.add(`money_${message.guild.id}_${user.id}`, money)
    }
};