const { setTimeout } = require('timers/promises');
const { Client, Intents } = require('discord.js');

const token = process.env.DISCORD_BOT_TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', async () => {
	console.log('Ready!');

	while(true) {

		for(const [_key, channel] of client.channels.cache){
			if (channel.type != 'GUILD_TEXT') continue;
			channel.threads.fetchArchived().then(async archived => {
				for (const [_, thread] of archived.threads){
					if (thread.name.slice(-1) == "*"){
						console.log(`Unarchiving ${channel.guild.name}/${channel.name}/${thread.name}`);
						await thread.setArchived(false);
					}
				}
			}).catch(err => console.log(`Ignoring ${channel.guild.name}/`));
		}

		await setTimeout(1000 * 3600);
	}
});

client.login(token);
