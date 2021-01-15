Mage
====

An Open Source discord bot fulfil my needs.

Documentation
=============
* [Overview](#overview)
* [Installation](#installation)
  * [Requirements](#requirements)
  * [Changing Files](#creating-and-changing-files)
  * [Getting API Keys](#getting-api-keys)
* [Usage](#usage)
* [Contributors](#contributors)

Overview
--------

The primary goal of this project is to fulfil my expectations from discord bots

Installation
------------

Will fill this out later.

### Requirements

You will need:
* [Node.js](https://nodejs "Node JS")

You might want:
* [Good Text Editor](https://code.visualstudio.com "Suggested: Visual Studio Code")
* [Git](https://git.com)

### Creating and Changing Files

Creating Files:
* [config-dev.ts](Bot/Data/config-dev.ts "The file with all the credentials.") This file will be used when hosting on a native pc (the format will remain same as [config.ts](Bot/Data/config.ts) "This file *indirectly* has all the credentials").

Changing Files
- Suggested:
  * [blacklist.ts](Bot/Data/blacklist.ts "The file with blacklisted users.\nWarning: blacklisted users will not be able to use the bot.")

- Not Suggested:
  * [config.ts](Bot/Data/config.ts "configuration file") This file has been setup in a special way that it can work on your host whilst still being in that same Open-Source repository making it easy to apply changes.
  
  **Note:** Do not have any of the env variables (process.env[varaible]) that are shown in [config.ts](Bot/Data/config.ts) or just have them correct as it is how the bot works. (On your host you should have those and are expected to put them not on native pc)

### Getting API Keys

Supercell:
1. [Brawl Stars](https://developer.brawlstars.com/ "Official Brawl Stars API")
2. [Clash Royale](https://developer.clashroyale.com/ "Official Royale API")
3. [Clash of Clans](https://developer.clashofclans.com/ "Official Clash of Clans API")

**Note:** I have used The [Royale API proxy](https://docs.royaleapi.com/#/proxy) and hence you would want to add `128.128.128.128` as an whitelisted IP Address in the above keys in order for this to function properly.

GitHub:
* [GitHub API Key](https://developer.github.com)

### Running the bot

Run `npm run start` in your terminal

Contributors
------------

[See AUTHORS.md](AUTHORS.md)
