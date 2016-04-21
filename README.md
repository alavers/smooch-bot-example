# Brody Bot

A simple chat bot that is built on [smooch/smooch-bot-example](https://github.com/smooch/smooch-bot-example).


## Get Started

This is an Express app that uses the Smooch web widget to provide the chat interface on Heroku.

![heroku](/img/heroku.gif)

To deploy your own:

1. First, sign up for a free account at [smooch.io](https://app.smooch.io/signup)

1. With a new Smooch app created, go to the settings tab and take note of your App Token. Also, generate a new Secret Key, and take note of the key ID and secret.

    ![settings](/img/settings.png)

1. Deploy your app to Heroku using the button below. You'll need to specify your app token, key ID, and secret in the app's `SMOOCH_APP_TOKEN`, `SMOOCH_KEY_ID`, and `SMOOCH_SECRET` config settings.

    [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/smooch/smooch-bot-example)

1. Your app should now be running on Heroku but you're not quite done yet. Take note of the URL where your heroku app is running, for example `https://foo-bar-4242.herokuapp.com`. You'll need to specify this in your heroku app `SERVICE_URL` config variable. You can do this in the Heroku control panel under *Settings* > *Config Variables*. Make sure to go under Deploy and connect to your GitHub repo. Then, enable Automatic Deploys from the master branch (this means anytime you make an edit to your bot's script, it'll automatically update and talk as intended in seconds.)

1. You should be all set. Open your Heroku app and start chatting with your new bot!

1. **Bonus:** Open the Smooch [control panel](https://app.smooch.io) and add more integrations. You can add new user channels like Twilio SMS, or you can add Slack or HipChat which will let you join in on the conversation along side your bot. Pretty neat!

![slack](/img/slack.png)

## Teach Your Bot To Talk

Now that you have a bot you need to decide what it'll say. That's where the file script.json comes in. It's the document you need to edit to make your bot talk.

You can edit this file, the keywords are on the left, and the bot's response is on the right. For example, if a user types "hello" then the bot will say "Sweet, let's do this..."
