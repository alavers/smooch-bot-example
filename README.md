# SmoochBot Examples

A set of example chat bots built on [smooch/smooch-bot](https://github.com/smooch/smooch-bot).

Before you get started with any of these samples, from this directory you should:

```
$ npm install
```

All of these samples use the same scipt defined in `script.js`. Feel free to play around with it as you go.

## Console Example (/console)

This is the simplest sample that runs via the command line and uses an in-memory store to track state.

![console](/img/console.gif)

To run it, simply:

```
$ node console
```

And start chatting with your bot on the command line.

## Heroku Example (/heroku)

This is an Express app that uses the Smooch web widget to provide the chat interface. The app makes use of `SmoochApiStore` and `SmoochApiBot` to persist conversation state and user properties via Smooch.

![heroku](/img/heroku.gif)

To deploy your own:

1. First, sign up for a free account at [smooch.io](https://app.smooch.io/signup)

1. With a new Smooch app created, go to the settings tab and take note of your App Token. Also, generate a new Secret Key, and take note of the key ID and secret.

    ![settings](/img/settings.png)

1. Deploy your app to Heroku using the button below. You'll need to specify your app token, key ID, and secret in the app's `SMOOCH_APP_TOKEN`, `SMOOCH_KEY_ID`, and `SMOOCH_SECRET` config settings.

    [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/smooch/smooch-bot-example)

1. Your app should now be running on Heroku but you're not quite done yet. Take note of the URL where your heroku app is running, for example `https://foo-bar-4242.herokuapp.com`. You'll need to specify this in your heroku app `SERVICE_URL` config variable. You can do this in the Heroku control panel under *Settings* > *Config Variables*, or if you have the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed you can do it like so:

        $ heroku config:set SERVICE_URL=https://foo-bar-4242.herokuapp.com -a foo-bar-4242

1. You should be all set. Open your Heroku app and start chatting with your new bot!

1. **Bonus:** Open the Smooch [control panel](https://app.smooch.io) and add more integrations. You can add new user channels like Twilio SMS, or you can add Slack or HipChat which will let you join in on the conversation along side your bot. Pretty neat!

![slack](/img/slack.png)

# Troubleshooting your bot

Is your bot misbehaving? Not working? Here are some steps you can follow to figure out what's going wrong.

**Warning:** command line instructions incoming. You may not be accustomed to using the command line but don't worry, it's much easier than you think.


## Check your bot's logs on heroku

If there's a bug in your code, checking the heroku logs is the best way to figure out what's going wrong. Here's how:

1. Install the heroku toolbelt: https://toolbelt.heroku.com/ These are power tools that let you do a lot more than what Heroku dashboard alone allows.

2. Next, open your preferred terminal app. On OSX the default Terminal app will work fine here.

3. Log in to the heroku toolbelt with the following command:

        heroku login

    If the command heroku isn't found, try restarting your terminal app. Once logged in you should be able to list all of your heroku apps like so:

        heroku apps

    which should give you something like this:

        $ heroku apps
        === My Apps
        your-app

4. Now you can check the logs of your heroku app like so:

        heroku logs -a your-app

    This will give you a dump of your most recent app logs. They will look something like the following. Can you spot the error below?

        2016-05-09T14:08:34.966358+00:00 heroku[slug-compiler]: Slug compilation started
        2016-05-09T14:08:34.966363+00:00 heroku[slug-compiler]: Slug compilation finished
        2016-05-09T14:08:34.946344+00:00 heroku[web.1]: State changed from up to starting
        2016-05-09T14:08:34.945605+00:00 heroku[web.1]: Restarting
        2016-05-09T14:08:37.860802+00:00 heroku[web.1]: Stopping all processes with SIGTERM
        2016-05-09T14:08:39.493078+00:00 heroku[web.1]: Process exited with status 143
        2016-05-09T14:08:41.182450+00:00 heroku[web.1]: Starting process with command `npm start`
        2016-05-09T14:08:45.818995+00:00 app[web.1]:
        2016-05-09T14:08:45.819017+00:00 app[web.1]: > smooch-bot-example@1.0.0 start /app
        2016-05-09T14:08:45.819018+00:00 app[web.1]: > node heroku
        2016-05-09T14:08:45.819019+00:00 app[web.1]:
        2016-05-09T14:08:46.601444+00:00 app[web.1]: module.js:433
        2016-05-09T14:08:46.601454+00:00 app[web.1]:     throw err;
        2016-05-09T14:08:46.601455+00:00 app[web.1]:     ^
        2016-05-09T14:08:46.601456+00:00 app[web.1]:
        2016-05-09T14:08:46.601457+00:00 app[web.1]: SyntaxError: /app/script.json: Unexpected token }
        2016-05-09T14:08:46.601458+00:00 app[web.1]:     at Object.parse (native)
        2016-05-09T14:08:46.601458+00:00 app[web.1]:     at Object.Module._extensions..json (module.js:430:27)
        2016-05-09T14:08:46.601459+00:00 app[web.1]:     at Module.load (module.js:357:32)
        2016-05-09T14:08:46.601460+00:00 app[web.1]:     at Function.Module._load (module.js:314:12)
        2016-05-09T14:08:46.601460+00:00 app[web.1]:     at Module.require (module.js:367:17)
        2016-05-09T14:08:46.601461+00:00 app[web.1]:     at require (internal/module.js:20:19)
        2016-05-09T14:08:46.601462+00:00 app[web.1]:     at Object.<anonymous> (/app/script.js:6:21)
        2016-05-09T14:08:46.601473+00:00 app[web.1]:     at Module._compile (module.js:413:34)
        2016-05-09T14:08:46.601474+00:00 app[web.1]:     at Object.Module._extensions..js (module.js:422:10)
        2016-05-09T14:08:46.601474+00:00 app[web.1]:     at Module.load (module.js:357:32)

    Did you notice the `SyntaxError` part? It looks like there's a problem in my script.json. If I inspect that file in github I'll see that indeed, I have a stray comma at the end if the second to last line.

    ![image](/img/script-error.png)

    After I remove that comma and redeploy, everything will return to normal.

## How do I deploy my fixes to Heroku?

Great question! Now that you've found your bug and fixed it, you want to redeploy your app. With Heroku you can trigger a deployment using git. Without going into detail, git is a code versioning system it's where github gets its name. Git is the software, github.com is a separate company that hosts git code repositories. If you're using a Mac you should already have git installed. Although git is a very complex tool, it's worth [learning if you're eager](https://www.atlassian.com/git/tutorials/what-is-git), but for this guide's purposes we'll be using only the most basic concepts of git, `pull`ing changes from a remote github repository, `commit`ing changes, and then `push`ing those changes out to a remote repository.

1. To deploy using git you first have to download a copy of your heroku app's code, like so:

        git clone https://github.com/your-github-username/your-app

    Note that git will prompt you to enter your github credentials.

2. This will create a new git copy of your code in a new folder. You can go into that folder like so:

        cd your-app

3. Now you can use the heroku toolbelt to link this git copy up to your heroku app with the following command:

        heroku git:remote -a your-app

4. Once that's done, you can now deploy to heroku directly from this directory. If you've made any fixes on github directly, be sure to sync them here like so:

        git pull origin master
        git push heroku master

5. You can also make changes to your local copy of the code. To do this, edit whatever file you wish in your preferred text editor, and then commit and push them up to github. You'll add a commit message, which is a short sentence decribing what you changed.

        git commit -a -m 'Your commit message'
        git push origin master

    Then, you can deploy those changes to heroku in the same way:

        git push heroku master
