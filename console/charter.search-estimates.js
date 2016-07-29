'use strict';
const request = require('request-promise');


module.exports = {
  prompt: (bot) => bot.say('Everything fine?'),
  receive: (bot, message) => {
    const msg = message.text.trim();
    if (msg === 'no') return 'charter.start';
    return bot.getProp('charter.pax').then(function(paxCount){

    return new Promise(function(resolve, reject){
      console.log('sending request for ', paxCount);
        return request.get({
          uri: `https://api-dev.flyvictor.com/realtime-prices`,
          oauth: {
            consumer_key: 'legacy-application',
            consumer_secret: 'kfJyFWwUB3ZXNr0KC!vRz$'
          },
          qs: {
            limit: 1
          },
          headers: {
            userAuthToken: '12566e93d20a332998f62dd8ec3b3209c94c7c67cc6523a311000725480ab95054e572b817ac0609a5390bf17397f55485b8c8ad4438cd4c40069b9678d4344b01efe698347ab7fe97c8bd818a0603ba04af3cbdc0970a9da8bee6e6782e3c23352f0b1b1b88efb9fe9623f2f3c7e6da6c354eb6889536d0b2b974a36883bea6',
          }
        }).then(function(body){
          //console.log(body);
          const estimate = JSON.parse(body)['realtime-prices'][0];

          bot.say(`Ok, so the estimate price for this charter is ${estimate.price.amount} ${estimate.price.currency}`);
          resolve('start');
        });
      }).catch(function(err){
        console.error(err);
      });
    });
  }
};