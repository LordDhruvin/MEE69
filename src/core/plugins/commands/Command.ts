import { Plugin } from "../..";

export interface Command extends Plugin {
    triggers: string;
}
