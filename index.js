const { setTimeout } = require('timers/promises');
const { Client, Intents } = require('discord.js');

const token = process.env.DISCORD_BOT_TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

async function unarchive_if_eligible(thread){
  if (thread.name.slice(-1) != "*") return;
  if (thread.locked || !thread.archived) return;
  console.log(`Unarchiving ${thread.parent.guild.name}/${thread.parent.name}/${thread.name}`);
  await thread.setArchived(false).catch(err => console.log(err));
}

client.once('ready', async () => {
  console.log('Ready!');

  console.log("Running an initial batch...");

  let channel_counter = 0;
  let thread_counter = 0;
  for(const [_key, channel] of client.channels.cache){
    if (channel.type != 'GUILD_TEXT') continue;
    await channel.threads.fetchArchived().then(async archived => {
      for (const [_, thread] of archived.threads){
        unarchive_if_eligible(thread);
        thread_counter++;
      }
      channel_counter++;
    }).catch(err => console.log(`Ignoring ${channel.guild.name}/`));
  }

  console.log(`Scanned through ${channel_counter} channels, ${thread_counter} threads`);

  client.on("threadUpdate", (oldThread, newThread) => {
    setTimeout(5 * 1000).then(unarchive_if_eligible(newThread));
  })
});

client.login(token);
