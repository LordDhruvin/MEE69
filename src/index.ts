/**
    MEE69 - A discord bot
    Copyright (C) 2021 Dhruvin Purohit

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import { readdir } from "fs/promises";
import { join } from "path";
import { DISCORD_TOKEN } from "./config";
import { Bot } from "./core";
import { AnyListener, Command } from "./plugins";

export const bot = new Bot(DISCORD_TOKEN);

bot.once("ready", async () => {
  console.log(`Logged in as ${bot.user.username}`);

  let files = await readdir(join(__dirname, "commands"));
  files.forEach((f) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    let req = require(join(__dirname, "commands", f));

    if ("default" in req) {
      req = req.default;
    }

    bot.commandManager.load(req as Command);
  });

  files = await readdir(join(__dirname, "events"));
  files.forEach((f) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    let req = require(join(__dirname, "events", f));

    if ("default" in req) {
      req = req.default;
    }

    bot.listenerManager.load(req as AnyListener, f);
  });
});
