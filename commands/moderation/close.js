module.exports = {
    name: 'close',
    aliases: ['del'],
    category: 'Moderation',
    utilisation: '{prefix}close',
	execute(client, message, args) {
		           if (!message.member.hasPermission("ADMINISTRATOR")) {
                    return message.reply(
                        "You do not have the permission to use that command."
                    );
                }
		
		if(message.channel.name.includes('ticket-')) {
			message.channel.delete();
		}
		else {
			return message.reply('you cannot use this command here. Please use this command when you want to delete a ticket.');
		}
		
	},
};