import { Client, Message, Interaction, PermissionResolvable, CommandInteraction } from "discord.js";
import { Schema } from "mongoose";

type loggingTypes = "channel" | "guild" | "interaction";
type messageTypes = "embed" | "text" | "custom-object";
declare interface loggingOptions {
  /**
   * The interaction type
   */
  type: loggingTypes;
  /**
   * The message content type
   */
  messageType: messageTypes;
}

/**
 * Send a message to aa servers logging channel
 * @param message The message to send
 * @param interaction The interaction that was sent or the channel to send the message to
 * @param client The bots client
 * @param options The options to send the message with
 */
export function logging(message: string | EmbedBuilder, interaction: CommandInteraction | string, client: Client, options: loggingOptions): Promise<void>;

/**
 * Return an embed to send to the user if the server hasn't finished setting up
 * @param message The embed description
 * @param param The parameter that is missing
 * @returns The embed object
 */
export function missingPreferences(message?: string, param?: string): EmbedBuilder;

/**
 * Check if a user is a server moderator
 * @param interaction The interaction that was sent
 * @param guildObj The guild database object
 * @returns If the user has the required permissions
 */
export function checkMod(interaction: CommandInteraction, guildObj?: Schema): Promise<Boolean>;

/**
 * Create a random string of letters and numbers
 * @param length The length of the random string
 * @returns A random string
 */
export function makeid(length?: number): String;

/**
 * Correclty capitalise a string
 * @param string The string to correct
 * @returns The corrected string
 */
export function correctCapitalisation(string: string): string;

export namespace guildPermsMessage {
  /**
   * Check if the client has permission to use a command
   * @param message The message object
   * @param client The bots client
   * @param type The type of permission to check
   */
  export async function clientPermissions(message: Message, client: Client, type: Array<PermissionResolvable> | PermissionResolvable): Promise<Boolean>;

  /**
   * Send a message to the user asking them to provide required permissions
   * @param message The message object
   * @param client The bots client
   * @param permission The missing permission
   */
  export function permissionCallback(message: Message, client: Client, permission: Array<PermissionResolvable> | PermissionResolvable): void;
}

export namespace guildPermsInteraction {
  /**
   * Check if the client has permission to use a command
   * @param client The bots client
   * @param interaction The message object
   */
   export async function clientPermissions(interaction: Interaction, client: Client, type: Array<PermissionResolvable> | PermissionResolvable): Promise<Boolean> {
    // Ensure valid parameters have been provided
    if (!interaction?.guildId || !client?.user) return Promise.resolve(false);
    if (!type) throw new TypeError("Missing required parameter 'type'");

    const guild = await client.guilds.fetch(interaction.guildId);
    const me = await guild.members.fetch(client.user.id);

    // Return whether the client has the required permissions
    if (Array.isArray(type))
      return type.every(t => me.permissions.has(t)) || false;
    else
      return me.permissions.has(type);
  }

  /**
   * Send a message to the user asking them to provide required permissions
   * @param interaction The interaction object
   * @param client The bots client
   * @param permission The missing permission
   * @param ephemeral Whether the message should be ephemeral
   */
  export function permissionCallback(interaction: Interaction, client: Client, permission: Array<PermissionResolvable> | PermissionResolvable, ephemeral?: boolean): void;
}