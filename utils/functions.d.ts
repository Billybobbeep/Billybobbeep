import { Client, Message, Interaction, MessageAttachment } from "discord.js";

/**
 * Send a message into the servers logging channel
 * @param {Object} msg The message to send
 * @param {Message} message The message to retreve the guild from
 * @param {Client} client The bots client
 * @param {Object} options Any additional options
*/
export declare function logging(msg: any, message: Message, client: Client, options: Object): Promise<void>;

/**
 * Clean the databoase of any unused documents
 * @param {Client} client The bots client
*/
export declare function cleanDatabase(client: Client): void;

/**
 * Draw a users rank card
 * @param {Buffer} avatar The users avatar
 * @param {String} username The users username
 * @param {Number} discriminator The users discriminator
 * @param {Number} currentXP The users current XP
 * @param {Number} requiredXP The required XP to level up
 * @param {Number} level The users current level
 * @returns The rank card as a MessageAtachment
*/
export declare function rank(avatar: Buffer, username: String, discriminator: Number, currentXP: Number, requiredXP: Number, level: Number): MessageAttachment;

/**
 * Slash command functions
*/
export declare namespace slashCommands {
    interface interactionResponse {
        custom: {
            id: String,
            token: String
        },
        message: Object,
        rawInteraction: Interaction
    }
    /**
     * @param {Interaction} interaction The slash command interaction
     * @param {Client} client The bots client
     * @param {String | Object} response The response to the interaction
     * @returns Returns the sent message
    */
    declare function reply(interaction: Interaction, client: Client, response: String | Object): Promise<interactionResponse>;

    /**
     * Update a pre-existing interaction
     * @param {Object} interaction The interaction
     * @param {String | Object} response The updated response
     * @returns Returns the Interaction
     */
    declare function update(interaction: Interaction, response: String | Object): Interaction;
    
    /**
     * Check if the client has the correct permissions
     * @param {Interaction} interaction The slash command interaction
     * @param {String} type The permission type
     * @returns If the client has the permission
    */
    declare function clientPermissions(client: Client, interaction: Interaction, type: String): Promise<Boolean>;

    /**
     * Send an embed explaining that the client does not have the correct permissions
     * @param {Interaction} interaction The slash command interaction
     * @param {Client} client The bots client
     * @param {String} permission The missing permission
    */
    declare function permissionCallback(interaction: Interaction, client: Client, permission: String): void;
}

/**
 * Button interactions
*/
export declare namespace buttons {
   declare interface responseData {
        interaction: {
            readonly id: String,
            readonly token: String            
        },
        readonly message: Object
    }
    /**
     * @param {Object} interaction The slash command interaction
     * @param {Client} client The bots client
     * @param {*} response The response to the interaction
     * @param {Object} options The message options
     * @returns If the response was successful
    */
    declare function respond(interaction: Interaction, client: Client, response: any): Promise<Boolean | responseData>;
}

export declare namespace guildPerms {
    declare interface Options {
        guild: Boolean
    }
    /**
     * Check if the client has the correct permissions
     * @param {Message} message
     * @param {String} type The permission type
     * @param {Object} options Additional options
     * @returns If the client has the correct permissions
    */
    declare function clientPermissions(client: Client, message: Message, type: String, options: Options): Promise<Boolean>;

    /**
     * Send an embed to the server explaining that the client does not have the correct permissions
     * @param {Message} message
     * @param {Client} client
     * @param {String} permission The missing permission
    */
    declare function permissionCallback(message: Message, client: Client, permission: String): void;
}