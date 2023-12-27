// TOKEN AND NODE MODULES
const TelegramBot = require("node-telegram-bot-api");
const token = "6786333304:AAHQFX3YtnOlRyJlJNCEGpBX8JXza-0foIk";
const bot = new TelegramBot(token, { polling: true });
let weather_app_key = "9955c43c62e0a0961fa91e2b7356ec73";
let users = [];

bot.on("message", (msg) => {
  let id = msg.from.id;
  if (msg.text == "/start") {
    if (!users.includes(id)) {
      users.push(id);
    }
  } else {
    let url = `https://api.openweathermap.org/data/2.5//weather?q=${msg.text}&appid=${weather_app_key}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        bot.sendMessage(
          id,
          `🌆 City: ${data.name}
  🌡 Temperature: ${Math.ceil(data.main.temp - 273.15)}°`
        );
      })
      .catch((cat) => bot.sendMessage(id, "Qala tabilmadi"));
  }
});
