'use strict';

module.exports = {
  prompt: (bot) => bot.say('How many seats to charter?'),
  receive: (bot, message) => {
    const max = 265;
    const min = 1;
    const seats = parseInt(message.text.trim());

    if (
      isNaN(seats) ||
      seats < min
    ){
      bot.say(`Please provide a number between ${min} and ${max}`);
      return 'charter.pax';
    }

    if (seats > 265){
      bot.say(`Whoa! Flying fortress is not available for charter yet. The max number of seats available is ${max}`);
      return 'charter.pax';
    }

    bot.setProp('charter.pax', seats);
    return 'charter.search-estimates'
  }
};