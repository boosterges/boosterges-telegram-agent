require('dotenv').config({ path: '.env.local' });
const { Telegraf } = require('telegraf');
const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.start((ctx) => ctx.reply('Halo bro! Bot BoosterGes ON! 🚀 Tanya apa aja!'));
bot.on('text', async (ctx) => {
  try {
    await ctx.sendChatAction('typing');
    const res = await openai.chat.completions.create({
      model: process.env.MODEL,
      messages: [
        { role: 'system', content: 'Kamu asisten gaul bahasa Indonesia, kocak.' },
        { role: 'user', content: ctx.message.text }
      ],
    });
    await ctx.reply(res.choices[0].message.content);
  } catch (e) {
    console.error(e);
    ctx.reply('Error: ' + e.message);
  }
});
bot.launch().then(() => console.log('BOT JALAN! Cek Telegram lu sekarang!'));
