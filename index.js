//Create a Discord bot sing openAI API that interacts on the Discord server
require("dotenv").config();
//

//Prepare to connect to the Discord API
const {Client, GatewayIntentBits} = require('discord.js')
const client= new Client({ intents:[
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]
})

//Prepare connection to OpenAi API
const {Configuration, OpenAIApi}=require('openai');
const configuration = new Configuration({
    organization:process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY
})

const openai = new OpenAIApi(configuration);

//Check for when a message on discord is sent
client.on('messageCreate', async function(message){
    try {
        //Don't respond to yourself  or other bots
        if(message.author.bot) return;
        const gptResponse = await openai.createCompletion({
            model:"davinci",
            prompt:`GPT3 is a friendly chatbot. \n\ 
            GPT3: hello, how are you? \n\
            ${message.author.username}: ${message.content} \n\
            GPT3:`,
            max_tokens:100,
            stop: ["GPT3:", "Anass Lebkhaiti:"],
        })
        console.log(gptResponse.data)
        message.reply(`${gptResponse.data.choices[0].text}`);
        return;
    } catch (error) {
        console.log(error)
    }
})

//Log the bot into Discord
client.login(process.env.DISCORD_TOKEN);
console.log("ChatGPT bot is Online on Discord");