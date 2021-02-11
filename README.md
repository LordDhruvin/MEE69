# MEE69

MEE6, but better
[Help regarding this can be asked here](https://dsc.gg/dhruvin)

# Documentation

-   [Overview](#overview)
-   [Installation](#installation)
    -   [Heroku](#heroku)
    -   [Native PC](#native-pc)
        -   [Requirements](#requirements)
        -   [Running the bot](#running-the-bot)
    -   [Changing Files](#creating-and-changing-files)
    -   [Getting API Keys and Other requirments](#getting-api-keys-and-other-requirements)
-   [Usage](#usage)
-   [Contributors](#contributors)

## Overview

The primary goal of this project is to fulfil my expectations from discord bots

## Installation

Will fill this out later.

### Heroku

Hosting on heroku is very easy. All you have to do is fork this repository, make changes to [safe-config.ts](Bot/Data/safe-config.ts 'Change these values to fit your needs.')

1. go to [Heroku](https://heroku.com 'Go to Heroku')
2. create an application
3. Add your fork as the repository (link your github if not done yet)
4. add environment varaibles like this

-   TOKEN => your discord-bot's token
-   USER_DB => your mongodb atlas (or even any other host) url which you will be using to connect to user database
-   GUILD_DB => your mongodb atlas (or even any other host) url which you will be using to connect to guild database
-   BS_API_KEY => your brawl stars api key [see this](#getting-api-keys)
-   COC_API_KEY => your clash of clasn api key [see this](#getting-api-keys)
-   CR_API_KEY => your clash royale api key [see this](#getting-api-keys)
-   STARLIST_KEY => your starlist (now name changed to brawlify) api key (optional as private api)
-   GITHUB_API_KEY => your github api key [see this](#getting-api-keys)

5. Change the dyno worker thing to worker (it is web by default)

And your bot should be online!

### Native PC

### Requirements

You will need:

-   [Node.js](https://nodejs 'Node JS')

You might want:

-   [Good Text Editor](https://code.visualstudio.com 'Suggested: Visual Studio Code')
-   [Git](https://git.com)

### Running the bot

Run `npm i` in your terminal (Node js will install all the dependencies.)

Then,
Run `npm run start` in your terminal

### Creating and Changing Files

Creating Files:

-   [config-dev.ts](Bot/Data/config-dev.ts 'The file with all the credentials.') This file will be used when hosting on a native pc (the format will remain same as [config.ts](Bot/Data/config.ts) "This file _indirectly_ has all the credentials").

Changing Files

-   Suggested:

    -   [blacklist.ts](Bot/Data/blacklist.ts 'The file with blacklisted users.')
    -   [safe-config.ts](Bot/Data/safe-config.ts 'This file has non-confidential data')

-   Not Suggested:

    -   [config.ts](Bot/Data/config.ts 'configuration file') This file has been setup in a special way that it can work on your host whilst still being in that same Open-Source repository making it easy to apply changes.

    **Note:** Do not have any of the env variables (process.env[varaible]) that are shown in [config.ts](Bot/Data/config.ts) or just have them correct as it is how the bot works. (On your host you should have those and are expected to put them not on native pc)

### Getting API Keys and Other requirements

Supercell:

1. [Brawl Stars](https://developer.brawlstars.com/ 'Official Brawl Stars API')
2. [Clash Royale](https://developer.clashroyale.com/ 'Official Royale API')
3. [Clash of Clans](https://developer.clashofclans.com/ 'Official Clash of Clans API')

**Note:** I have used The [Royale API proxy](https://docs.royaleapi.com/#/proxy) and hence you will have to add `128.128.128.128` as an whitelisted IP Address in the above keys in order for this to function properly.

GitHub:

-   [GitHub API Key](https://developer.github.com)

Lavalink:

This needs you to either host a lavalink server or use an exisiting server.

-   [Lavalink](https://google.com/search?q=Lavalink)

Spotify:

This is needed for searching Spotify music tracks and adding them to queue.
This is an optional requirement.

-   [Spotify](https://developer.spotify.com/dashboard)

## Usage

You can use this bot for any purpose you want except for if it breaks TOS of discord, supercell, github etc.
Do not use this bot for any illegal purposes.

## Contributors

[See AUTHORS.md](AUTHORS.md)
