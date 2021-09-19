import { Client, Message, Interaction, MessageAttachment } from "discord.js";

/**
 * Send a message into the servers logging channel
 * @param {Object} msg The message to send
 * @param {Message} message The message to retreve the guild from
 * @param {Client} client The bots client
 * @param {Object} options Any additional options
*/
export function logging(msg: any, message: Message, client: Client, options: Object): void;

/**
 * Clean the databoase of any unused documents
 * @param {Client} client The bots client
*/
export function cleanDatabase(client: Client);

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
export function rank(avatar: Buffer, username: String, discriminator: Number, currentXP: Number, requiredXP: Number, level: Number): MessageAttachment;

/**
 * Log a string to the console
 * @param string A string to log
 */
export function log(string: String): void;

export declare namespace examples {
    /**
     * Log a string to the console
     * @param string A string to log
     */
    function log2(string: String): void;
}

export declare namespace slashCommands {
    /**
     * @param {Interaction} interaction The slash command interaction
     * @param {Client} client The bots client
     * @param {*} response The response to the interaction
     * @returns Returns the sent message
    */
    async function reply(interaction: Interaction, client: Client, response: any): void;
    
    /**
     * Check if the client has the correct permissions
     * @param {Interaction} interaction The slash command interaction
     * @param {String} type The permission type
     * @returns If the client has the permission
    */
    async function clientPermissions(client: Client, interaction: Interaction, type: String): Boolean;

    /**
     * Send an embed explaining that the client does not have the correct permissions
     * @param {Interaction} interaction The slash command interaction
     * @param {Client} client The bots client
     * @param {String} permission The missing permission
    */
    function permissionCallback(interaction: Interaction, client: Client, permission: String): void;
}

export declare namespace buttons {
    interface responseData {
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
    async function respond(interaction: Interaction, client: Client, response: any): Boolean | responseData;
}

export declare namespace guildPerms {
    interface Options {
        guild: Boolean
    }
    /**
     * Check if the client has the correct permissions
     * @param {Message} message
     * @param {String} type The permission type
     * @param {Object} options Additional options
     * @returns If the client has the correct permissions
    */
    async function clientPermissions(client: Client, message: Message, type: String, options: Options): Boolean;

    /**
     * Send an embed to the server explaining that the client does not have the correct permissions
     * @param {Message} message
     * @param {Client} client
     * @param {String} permission The missing permission
    */
    function permissionCallback(message: Message, client: Client, permission: String): void;
}