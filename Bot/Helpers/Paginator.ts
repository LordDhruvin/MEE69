import { MessageEmbed } from "discord.js";
import { Message } from "discord.js";

//Trying to make this.
export default class Paginator {
    /**
     * The Paginator Class.
     * @param message The message that invoked the paginator
     * @param embed The embed to use (can be used as a template)
     */
    constructor(message: Message, embed: MessageEmbed = new MessageEmbed()) {
        this._msg = message
        this._emb = embed
        this._arr = undefined//I love ts :)
    }

    /**
     * The Message according to which the user and channel are chosen
     */
    private _msg: Message

    /**
     * The Embed to use
     */
    private _emb: MessageEmbed

    /**
     * The Array to paginate
     */
    private _arr: string[]|undefined

    /**
     * This is one of the main inputs to be provided.
     * @param {Array} array The Array to use.
     */
    public useArray(array: string[]) {
        this._arr = array
    }

    //I might end up changing all this or use someone else's. Using Vilicus Paginator rn with some changes.
    private async generate(embeds: MessageEmbed[]) {
        let currentPage = 0
        let footer = (current: number) => `Showing page \`${current + 1}/${embeds.length}\``

        let reactions = []
    }
    //Needs work. pretty confused here but i guess this will go good.
}