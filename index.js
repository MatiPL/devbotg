//==============================\\
//    NO DELETE THIS WORDS!!    \\
//          DevBot              \\
//   Bot created by Mati#4210   \\
//    NO DELETE THIS WORDS!!!   \\
//==============================\\

const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const commando = require('discord.js-commando');



client.on("ready", () => {
  console.log(`===============================================================================`);
  console.log(`DevBot Został uruchomiony pomyślnie w ${client.guilds.size} serwerach.`);
  console.log(`===============================================================================`);
  console.log(`DevBot Status Pingu`);
  console.log(`+250ms - Zle (Stan Krytyczny!)`);
  console.log(`150ms - Średni`);
  console.log(`100ms - Dobry`);
  console.log(`50ms - Bardzo Dobry`);
  console.log(`===============================================================================`);
  console.log(`Logi Bota:`)
  client.user.setActivity(`DevBot BETA | *help *bot`);
  //Statusy online-aktywny idle-afk offline-nie aktywny dnd-zajety
  client.user.setStatus('online')
  .then(console.log)
  .catch(console.error);

});

client.on("guildCreate", guild => {
  console.log(`DevBot został dodany: ${guild.name} (id: ${guild.id}).`);
  client.user.setActivity(`DevBot BETA | *help *bot`);
});

client.on("guildDelete", guild => {
  console.log(`DevBot został usunięty: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`DevBot BETA | *help *bot`);
});


client.on("message", async message => {

  if(message.author.bot) return;
  

  if(message.content.indexOf(config.prefix) !== 0) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
//Test\\

  if(command === "test") {
    if(!message.member.roles.some(r=>["Moderation"].includes(r.name)) )
    return message.reply("Przepraszam, ale nie masz do tego wystarczająco permisji");
    const m = await message.channel.send("Testowanie...");
    m.edit(`**====================**\n**Wyniki działaniu bota:** \n**Mój ping wynosi:** ${m.createdTimestamp - message.createdTimestamp}ms.\n**VTabela PinguV**\n 50ms - Bardzo Dobry\n 100ms - Dobry \n 150ms - Średni \n +250ms - Zle (Stan Krytyczny!)\n**====================**`);
    console.log(`DevBot został przeanalizowany [Test ping]`)
  }
  
//Say\\

  if(command === "say") {
    if(!message.member.roles.some(r=>["Moderation"].includes(r.name)) )
    return message.reply("Przepraszam, ale nie masz do tego wystarczająco permisji");
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }
  
//Kick\\

  if(command === "kick") {

    if(!message.member.roles.some(r=>["Moderation"].includes(r.name)) )
    return message.reply("Przepraszam, ale nie masz do tego wystarczająco permisji");
    
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Prosze podać użytkownika, którego mam Wyrzucić");
    if(!member.kickable) 
      return message.reply("Nie można wyrzucić użytkownika! Może nie masz permisji do tego? upewnij sie że masz role Moderation");
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Nie podano powodu";
    
    await member.kick(reason)
      .catch(error => message.reply(`Przepraszam ${message.author} Nie moge wyrzucić z powodu wystąpienia erroru : ${error}`));
    message.reply(`${member.user.tag} **Został Wyrzucony z serwera przez** ${message.author.tag} **Powód:** ${reason}`);
    console.log(`DevBot pomyślnie wyrzucił użytkownika [Kick]`)

  }
  
//Ban\\

  if(command === "ban") {
    if(!message.member.roles.some(r=>["Moderation"].includes(r.name)) )
    return message.reply("Przepraszam, ale nie masz do tego wystarczająco permisji");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Prosze podać użytkownika, którego mam Zbanować");
    if(!member.bannable) 
      return message.reply("Nie można wyrzucić użytkownika! Może nie masz permisji do tego? upewnij sie że masz role Moderation");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Nie podano powodu";
    
    await member.ban(reason)
      .catch(error => message.reply(`Przepraszam ${message.author} Nie moge wyrzucić z powodu wystąpienia erroru : ${error}`));
    message.reply(`${member.user.tag} **Został Zbanowany z serwera przez** ${message.author.tag} **Powód:** ${reason}`);
    console.log(`DevBot pomyślnie zbanował użytkownika [Ban]`)
  }

//czysc\\

  if(command === "czysc") {
    if(!message.member.roles.some(r=>["Moderation"].includes(r.name)) )
    return message.reply("Przepraszam, ale nie masz do tego wystarczająco permisji");
    
    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Prosze wybrać liczbe wiadomości, ile mam usunąć, od 2 do 100");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Wiadomości nie zostały usunięte, ponieważ wystąpił error: ${error}`));
	  const m = await message.channel.send("Pomyślnie wyczyszczono czat");
      console.log(`DevBot pomyślnie wyczyścił czat [Czysc]`)
  }

//Komendy\\

  if(command === "bot") {
    const m = await message.channel.send("**Informacje o bocie** \n Jestem DevBot, zostałem stworzony przez Mati#4210 \n Nie wiele potrafie, ale jestem w fazie prac");
  }

  if(command === "witaj") {
    const m = await message.channel.send(`Witaj, ${message.author} W czym moge pomóc? jeśli chcesz poznać mój system albo inne informacje, wpisz *bot lub *help`);
  }
if(command === "help") {
    const m = await message.channel.send("Ładuje informacje...");
    m.edit("**Komendy:** \n|[Prefix]bot - Pokazuje informacje o bocie| \n|[Prefix]say - Tekst który napiszesz, napisze go bot (Wymagana ranga: Moderation)| \n|[Prefix]kick - Wyrzuca osobe z serwera (Wymagana ranga: Moderation)| \n|[Prefix]ban - Banuje osobe z serwera (Wymagana ranga: Moderation)| \n|[Prefix]czysc - Czysci czat (Wymagana ranga: Moderation)| \n|[Prefix]blad - Powiadamiasz developera| \n|[Prefix]hug1-8 (ping)| \n|[Prefix]slap1-4 (ping)| \n|[Prefix]hug1-8 (ping)| \n|[Prefix]kiss1-7 (ping)| \n|[Prefix]pat1-4 (ping)| \n|[Prefix]lenny1-5| \n|[Prefix]dance1-3| \n|[Prefix]poke1-5| \n|[Prefix]aktualizacje - Pokazuje aktualizacje bota| \n**UWAGA!!! ŻEBY KOMENDY TYPU KICK ITP. DZIAŁAŁY, UŻYTKOWNIK KTÓRY WYKONUJE TĄ KOMENDE POTRZEBUJE RANGI Moderation !!! RANGA Moderation i ranga DevBot, (Ranga DevBot robi sie automatycznie po dołączeniu bota, i bot ją otrzymuje) MUSZĄ SIE ZNAJDOWAĆ NA SAMEJ GÓRZE LISTY RANG!!!**");
  }
if(command === "blad") {
    const m = await message.channel.send("**Developer został powiadomiony**\nzgłoś sie do niego w ciągu 10 minut\nGdy nie zgłosisz sie w ciągu 10 minut, zgłoszenie zostanie usunięte\nDiscord Developera: Mati#4210");
    console.log(`DevBot Dostałeś zgłoszenie!`)
    console.log(`W ciągu 10 minut powinien sie z tobą skontaktować użytkownik,`)
    console.log(`który chciał coś zgłosić`)
  }
 if(command === "aktualizacje") {
	 const m = await message.channel.send("Ładuje liste ChangeLog...");
	 m.edit("**Aktualizacje** \n\n**23 Sierpnia 2019** \n -Poprawiono błędy");
  }
//Gif\\

      if(command === "hug1") {
    
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/aab83bd3725feeaccb9929f8ca964db9/tenor.gif");
  }
      if(command === "hug2") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/047b9014843a446f1c0f18e936f5abb1/tenor.gif");
  }
      if(command === "hug3") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/f2d41b50c49426ea42411f14779a7c1c/tenor.gif");
  }
      if(command === "hug4") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/934adba8e5516096e526f955458ec94a/tenor.gif");
  }
      if(command === "hug5") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/3739a516b2f49bdd4b4667f0db7d3a48/tenor.gif");
  }
      if(command === "hug6") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/61ea96bce16c53a913336a3dbc1a6100/tenor.gif");
  }
      if(command === "hug7") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/6b371d1268accf30a8afe15d63f977e0/tenor.gif");
  }
      if(command === "hug8") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/3f656b354f5534a844a9616d707bff12/tenor.gif");
  }
      if(command === "slap1") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/734d628ba871022bc9ae142035b969b5/tenor.gif");
  }
      if(command === "slap2") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/53b846f3cc11c7c5fe358fc6d458901d/tenor.gif");
  }
      if(command === "slap3") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/47a6be1fbc1c40c3a55c0e2c8b725603/tenor.gif");
  }
      if(command === "slap4") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/49b0ce2032f6134c31e1313cb078fe5a/tenor.gif");
  }
      if(command === "kiss1") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/924c9665eeb727e21a6e6a401e60183b/tenor.gif");
  }
      if(command === "kiss2") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/9fb52dbfd3b7695ae50dfd00f5d241f7/tenor.gif");
  }
      if(command === "kiss3") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/68d59bb29d7d8f7895ce385869989852/tenor.gif");
  }
      if(command === "kiss4") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/26aaa1494b424854824019523c7ba631/tenor.gif");
  }
      if(command === "kiss5") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/be2b3298bc9880b9ffcdc7a47635fff6/tenor.gif");
  }
      if(command === "kiss6") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/197df534507bd229ba790e8e1b5f63dc/tenor.gif");
  }
      if(command === "kiss7") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/48963a8342fecf77d8eabfd2ab2e75c1/tenor.gif");
  }
      if(command === "pat1") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/69fb17b3eafe27df334f9f873473d531/tenor.gif");
  }
      if(command === "pat2") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/40f454db8d7ee7ccad8998479fbabe69/tenor.gif");
  }
      if(command === "pat3") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/1d37a873edfeb81a1f5403f4a3bfa185/tenor.gif");
  }
      if(command === "pat4") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/3dc7f665ac2fc1ec928f048813e30c1b/tenor.gif");
  }
      if(command === "lenny1") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/09bee46d966d658586e8ae3224a7f294/tenor.gif");
  }
      if(command === "lenny2") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/19336ecab93f8a77b90abc6de7704388/tenor.gif")
  }
      if(command === "lenny3") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/21b37abd680f486553651ac0861a531d/tenor.gif");
  }
      if(command === "lenny4") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/9c48c93c1487f3ed43fdfb08337c8bef/tenor.gif");
  }
      if(command === "lenny5") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/b3ddcb06ec0b9240af75b8960d898802/tenor.gif");
  }
      if(command === "dance1") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/105811b9b4a51e5ac8670e6640c20d1e/tenor.gif");
  }
      if(command === "dance2") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/e9ef71719c8f49ac307771192b16ee4b/tenor.gif");
  }
      if(command === "dance3") {
    const m = await message.channel.send("Ładuje gifa...");
    m.edit("https://media.tenor.com/images/ae22999ceedf1adf689aefdf64aa5e9c/tenor.gif");
  }
      if(command === "poke1") {
    const m = await message.channel.send("Ładuje gifa...");   
    m.edit("https://media.tenor.com/images/c89c83c69891c474197745c2b86ce161/tenor.gif");
  }
      if(command === "poke2") {
    const m = await message.channel.send("Ładuje gifa...");   
    m.edit("https://media.tenor.com/images/c46116b9116e1baa24e96fa6c5a78818/tenor.gif");
  }
      if(command === "poke3") {
    const m = await message.channel.send("Ładuje gifa...");   
    m.edit("https://media.tenor.com/images/c3b9e561131197a739664c6b1ebe5622/tenor.gif");
  }
      if(command === "poke4") {
    const m = await message.channel.send("Ładuje gifa...");   
    m.edit("https://media.tenor.com/images/d8fffe308964ca8eda0e82d86e5f8f11/tenor.gif");
  }
      if(command === "poke5") {
    const m = await message.channel.send("Ładuje gifa...");   
    m.edit("https://media.tenor.com/images/c555fe22967cb9e90ea3560365b500de/tenor.gif");
  }
});

client.login(config.token);