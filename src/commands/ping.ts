import { CreateCommand } from "../plugins";

export default CreateCommand(
    ["ping", "pong"],
    async (_bot, msg) =>
        await msg.channel.createMessage({
            content: "Pong!",
            messageReference: {
                messageID: msg.id,
            },
        }),
);
