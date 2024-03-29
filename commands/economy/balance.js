const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: 'balance',
    aliases: ['bal', 'money'],
    category: 'Economy',
    utilisation: '{prefix}balance <user>',
  execute(bot, message, args) {
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.member;

    let bal = db.fetch(`money_${message.guild.id}_${user.id}`);

    if (bal === null) bal = 0;

    let bank = db.fetch(`bank_${message.guild.id}_${user.id}`);

    if (bank === null) bank = 0;
let Total = bal + bank
    if (user) {
      let moneyEmbed = new MessageEmbed()
        .setColor("#ff0000")
        .setDescription(
          `**${user.user.username}'s Balance**\n**Cash:** ${bal}$\n**Bank:** ${bank}$\n**Total:** ${Total}$`
        );
      message.channel.send(moneyEmbed);
    } else {
      return message.channel.send("**Enter A Valid User!**");
    }
  }
};