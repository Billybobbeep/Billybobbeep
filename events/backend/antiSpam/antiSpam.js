const Discord = require('discord.js');
const embed = new Discord.MessageEmbed();
const db = require('../../../data/databaseManager/index.js');
const { EventEmitter } = require('events');

//Settings

const maxInterval = 20000;              //Interval
const maxDuplicatesInterval = 20000;    //Interval

const muteEnabled = true;               //If the bot can mute
const muteThreshold = 15;               //Amount of messages sent for a mute
const maxDuplicatesMute = 5;            //Amount of the same messages sent in a row before a mute

const warnEnabled = true;               //If the bot can warn
const warnThreshold = 20;               //Amount of messages sent for a warn
const maxDuplicatesWarn = 10;           //Amount of the same messages sent in a row before a warn

/**
 * @callback IgnoreMemberFunction
 * @param {Discord.GuildMember} member The member to check
 * @returns {boolean} Whether the member should be ignored
 */

/**
 * @callback IgnoreRoleFunction
 * @param {Discord.Collection<Discord.Snowflake, Discord.Role>} role The role to check
 * @returns {boolean} Whether the user should be ignored
 */

/**
 * @callback IgnoreGuildFunction
 * @param {Discord.Guild} guild The guild to check
 * @returns {boolean} Whether the guild should be ignored
 */

/**
 * @callback IgnoreChannelFunction
 * @param {Discord.Channel} channel The channel to check
 * @returns {boolean} Whether the channel should be ignored
 */

/**
 * Emitted when a member gets warned.
 * @event AntiSpamClient#warnAdd
 * @property {Discord.GuildMember} member The member that was warned.
 */

/**
 * Emitted when a member gets kicked.
 * @event AntiSpamClient#kickAdd
 * @property {Discord.GuildMember} member The member that was kicked.
 */

/**
 * Emitted when a member gets muted.
 * @event AntiSpamClient#muteAdd
 * @property {Discord.GuildMember} member The member that was muted.
 */

/**
 * Emitted when a member gets banned.
 * @event AntiSpamClient#warnAdd
 * @property {Discord.GuildMember} member The member that was banned.
 */

/**
 * Options for the AntiSpam client
 * @typedef AntiSpamClientOptions
 *
 * @property {number} [warnThreshold=3] Amount of messages sent in a row that will cause a warning.
 * @property {number} [muteThreshold=7] Amount of messages sent in a row that will cause a mute.
 *
 * @property {number} [maxInterval=2000] Amount of time (ms) in which messages are considered spam.
 * @property {number} [maxDuplicatesInterval=2000] Amount of time (ms) in which duplicate messages are considered spam.
 *
 * @property {number} [maxDuplicatesWarn=3] Amount of duplicate messages that trigger a warning.
 * @property {number} [maxDuplicatesMute=7] Amount of duplicate messages that trigger a mute.
 *
 * @property {string|Discord.Snowflake} [muteRoleName='Muted'] Name or ID of the role that will be added to users if they got muted.
 * @property {string|Discord.Snowflake} [modLogsChannelName='mod-logs'] Name or ID of the channel in which moderation logs will be sent.
 * @property {boolean} [modLogsEnabled=false] Whether moderation logs are enabled.
 *
 * @property {string|Discord.MessageEmbed} [warnMessage='{@user}, Please stop spamming.'] Message that will be sent in the channel when someone is warned.
 *
 * @property {boolean} [errorMessages=true] Whether the bot should send a message in the channel when it doesn't have some required permissions, like it can't kick members.
 * @property {string} [muteErrorMessage='Could not mute **{user_tag}** because of improper permissions.'] Message that will be sent in the channel when the bot doesn't have enough permissions to mute the member (to add the mute role).
 *
 * @property {Discord.Snowflake|string[]|IgnoreMemberFunction} [ignoredMembers=[]] Array of member IDs that are ignored.
 * @property {Discord.Snowflake|string[]|IgnoreRoleFunction} [ignoredRoles=[]] Array of role IDs or role names that are ignored. Members with one of these roles will be ignored.
 * @property {Discord.Snowflake|string[]|IgnoreGuildFunction} [ignoredGuilds=[]] Array of guild IDs or guild names that are ignored.
 * @property {Discord.Snowflake|string[]|IgnoreChannelFunction} [ignoredChannels=[]] Array of channel IDs or channel names that are ignored.
 * @property {Discord.PermissionString[]} [ignoredPermissions=[]] Users with at least one of these permissions will be ignored.
 * @property {boolean} [ignoreBots=true] Whether bots should be ignored.
 *
 * @property {boolean} [warnEnabled=true] Whether warn sanction is enabled.
 * @property {boolean} [muteEnabled=true] Whether mute sanction is enabled.
 *
 * @property {boolean} [verbose=false] Extended logs from module (recommended).
 * @property {boolean} [debug=false] Whether to run the module in debug mode.
 * @property {boolean} [removeMessages=true] Whether to delete user messages after a sanction.
 */

/**
 * Cached message.
 * @typedef CachedMessage
 *
 * @property {Discord.Snowflake} messageID The ID of the message.
 * @property {Discord.Snowflake} guildID The ID of the guild where the message was sent.
 * @property {Discord.Snowflake} authorID The ID of the author of the message.
 * @property {Discord.Snowflake} channelID The ID of the channel of the message.
 * @property {string} content The content of the message.
 * @property {number} sentTimestamp The timestamp the message was sent.
 */

/**
 * Cache data for the AntiSpamClient
 * @typedef AntiSpamCache
 *
 * @property {Discord.Snowflake[]} warnedUsers Array of warned users.
 * @property {Discord.Snowflake[]} mutedUsers Array of muted users.
 * @property {CachedMessage[]} messages Array of cached messages, used to detect spam.
 */

/**
 * Main AntiSpam class
 */
class AntiSpamClient extends EventEmitter {
    constructor (options) {
		super()
		/**
		 * The options for this AntiSpam client instance
		 * @type {AntiSpamClientOptions}
		 */
		this.options = {

			warnThreshold: options.warnThreshold || 3,
			muteThreshold: options.muteThreshold || 4,

			maxInterval: options.maxInterval || 2000,
			maxDuplicatesInterval: options.maxDuplicatesInterval || 2000,

			maxDuplicatesWarn: options.maxDuplicatesWarn || 7,
			maxDuplicatesMute: options.maxDuplicatesMute || 9,

			muteRoleName: options.muteRoleName || 'Muted',
			modLogsChannelName: options.modLogsChannelName || '➳𝓛𝓸𝓰𝓰𝓲𝓷𝓰',
			modLogsEnabled: options.modLogsEnabled || true,

			warnMessage: options.warnMessage,
			muteMessage: options.muteMessage,

			errorMessages: options.errorMessages || true,
			muteErrorMessage: options.muteErrorMessage || 'Could not mute **{user_tag}** due to improper permissions or the mute role couldn\'t be found.',

			ignoredMembers: options.ignoredMembers || [],
			ignoredRoles: options.ignoredRoles || [],
			ignoredGuilds: options.ignoredGuilds || [],
			ignoredChannels: options.ignoredChannels || [],
			ignoredPermissions: options.ignoredPermissions || [],
			ignoreBots: options.ignoreBots || true,

			warnEnabled: options.warnEnabled || true,
			muteEnabled: options.muteEnabled || true,

			verbose: options.verbose || false,
			removeMessages: options.removeMessages || false
		}

		/**
		 * The cache for this AntiSpam client instance
		 * @type {AntiSpamCache}
		 */
		this.cache = {
			messages: [],
			warnedUsers: [],
			mutedUsers: [],
		}
	}

/**
	 * Format a string and returns it.
	 * @ignore
	 * @param {string|Discord.MessageEmbed} string The string to format.
	 * @param {Discord.Message} message Context message.
	 * @returns {string|Discord.MessageEmbed}
	 */
	format (string, message) {
		if (typeof string === 'string') {
			return string
				.replace(/{@user}/g, message.author.toString())
				.replace(/{user_tag}/g, message.author.tag)
				.replace(/{server_name}/g, message.guild.name)
		} else {
			const embed = new Discord.MessageEmbed(string)
			if (embed.description) embed.setDescription(this.format(embed.description, message))
			if (embed.title) embed.setTitle(this.format(embed.title, message))
			if (embed.footer && embed.footer.text) embed.footer.text = this.format(embed.footer.text, message)
			if (embed.author && embed.author.name) embed.author.name = this.format(embed.author.name, message)
			return embed
		}
	}

	/**
	 * Send a message to the logs channel
	 * @ignore
	 * @param {string} message The message to log
	 * @param {Discord.Client} client The Discord client that will send the message
	 */
	log (message, client) {
		if (this.options.modLogsEnabled) {
			const modLogChannel = client.channels.cache.get(this.options.modLogsChannelName) ||
			message.guild.channels.cache.find((channel) => channel.name === this.options.modLogsChannelName && channel.type === 'text')
			if (modLogChannel) {
				modLogChannel.send(message)
			}
		}
	}

	/**
	 * Mute a user.
	 * @ignore
	 * @param {Discord.Message} message Context message.
	 * @param {Discord.GuildMember} member The member to mute.
	 * @param {CachedMessage[]} [spamMessages] The spam messages.
	 * @returns {Promise<boolean>} Whether the member could be muted.
	 */
	async muteUser (message, member, spamMessages) {
		this.cache.messages = this.cache.messages.filter((u) => u.authorID !== message.author.id)
		this.cache.mutedUsers.push(message.author.id)
		const role = message.guild.roles.cache.find(role => role.name === this.options.muteRoleName)
		const userCanBeMuted = role && message.guild.me.hasPermission('MANAGE_ROLES') && (message.guild.me.roles.highest.position > message.member.roles.highest.position)
		if (!userCanBeMuted) {
			if (this.options.verbose) {
				console.log(`DAntiSpam (kickUser#userNotMutable): ${message.author.tag} (ID: ${message.author.id}) could not be muted, improper permissions or the mute role couldn't be found.`)
			}
			if (this.options.errorMessages) {
				await message.channel
					.send(this.format(this.options.muteErrorMessage, message))
					.catch((e) => {
						if (this.options.verbose) {
							console.log(`DAntiSpam (muteUser#sendMissingPermMessage): ${e.message}`)
						}
					})
			}
			return false
		}
		if (message.member.roles.cache.has(role.id)) return true
		await message.member.roles.add(role, 'Spamming')
		if (this.options.muteMessage) {
			await message.channel.send(this.format(this.options.muteMessage, message)).catch(e => {
				if (this.options.verbose) {
					console.error(`DAntiSpam (kickUser#sendSuccessMessage): ${e.message}`)
				}
			})
		}
		if (this.options.modLogsEnabled) {
			this.log(`Spam detected: ${message.author} got **muted**`, message.client)
		}
		this.emit('muteAdd', member)
		return true
	}

	/**
	 * Warn a user.
	 * @ignore
	 * @param {Discord.Message} message Context message.
	 * @param {Discord.GuildMember} member The member to warn.
	 * @param {CachedMessage[]} [spamMessages] The spam messages.
	 * @returns {Promise<boolean>} Whether the member could be warned.
	 */
	async warnUser (message, member, spamMessages) {
		this.cache.warnedUsers.push(message.author.id)
		this.log(`Spam detected: ${message.author.tag} got **warned**`, message.client)
		if (this.options.warnMessage) {
			message.channel.send(this.format(this.options.warnMessage, message)).catch((e) => {
				if (this.options.verbose) {
					console.error(`DAntiSpam (warnUser#sendSuccessMessage): ${e.message}`)
				}
			})
		}
		this.emit('warnAdd', member)
		return true
	}

	/**
	 * Checks a message.
	 * @param {Discord.Message} message The message to check.
	 * @returns {Promise<boolean>} Whether the message has triggered a threshold.
	 * @example
	 * client.on('message', (msg) => {
	 * 	antiSpam.message(msg);
	 * });
	 */
	async message (message) {
		const { options } = this

		if (
			!message.guild ||
			message.author.id === message.client.user.id ||
			(message.guild.ownerID === message.author.id && !options.debug) ||
			(options.ignoreBots && message.author.bot)
		) {
			return false
		}

		const isMemberIgnored = typeof options.ignoredMembers === 'function' ? options.ignoredMembers(message.member) : options.ignoredMembers.includes(message.author.id)
		if (isMemberIgnored) return false

		const isGuildIgnored = typeof options.ignoredGuilds === 'function' ? options.ignoredGuilds(message.guild) : options.ignoredGuilds.includes(message.guild.id)
		if (isGuildIgnored) return false

		const isChannelIgnored = typeof options.ignoredChannels === 'function' ? options.ignoredChannels(message.channel) : options.ignoredChannels.includes(message.channel.id)
		if (isChannelIgnored) return false

		const member = message.member || await message.guild.members.fetch(message.author)

		const memberHasIgnoredRoles = typeof options.ignoredRoles === 'function'
			? options.ignoredRoles(member.roles.cache)
			: options.ignoredRoles.some((r) => member.roles.cache.has(r))
		if (memberHasIgnoredRoles) return false

		if (options.ignoredPermissions.some((permission) => member.hasPermission(permission))) return false

		const currentMessage = {
			messageID: message.id,
			guildID: message.guild.id,
			authorID: message.author.id,
			channelID: message.channel.id,
			content: message.content,
			sentTimestamp: message.createdTimestamp
		}
		this.cache.messages.push(currentMessage)

		const cachedMessages = this.cache.messages.filter((m) => m.authorID === message.author.id && m.guildID === message.guild.id)

		const duplicateMatches = cachedMessages.filter((m) => m.content === message.content && (m.sentTimestamp > (currentMessage.sentTimestamp - options.maxDuplicatesInterval)))

		/**
		 * Duplicate messages sent before the threshold is triggered
		 * @type {CachedMessage[]}
		 */
		const spamOtherDuplicates = []
		if (duplicateMatches.length > 0) {
			let rowBroken = false
			cachedMessages.sort((a, b) => b.sentTimestamp - a.sentTimestamp).forEach(element => {
				if (rowBroken) return
				if (element.content !== duplicateMatches[0].content) rowBroken = true
				else spamOtherDuplicates.push(element)
			})
		}

		const spamMatches = cachedMessages.filter((m) => m.sentTimestamp > (Date.now() - options.maxInterval))

		let sanctioned = false

		const userCanBeMuted = options.muteEnabled && !this.cache.mutedUsers.includes(message.author.id) && !sanctioned
		if (userCanBeMuted && (spamMatches.length >= options.muteThreshold)) {
			this.muteUser(message, member, [...duplicateMatches, ...spamOtherDuplicates]);
			sanctioned = true
		} else if (userCanBeMuted && (duplicateMatches.length >= options.maxDuplicatesMute)) {
			this.muteUser(message, member, [...duplicateMatches, ...spamOtherDuplicates]);
			sanctioned = true
		}

		const userCanBeWarned = options.warnEnabled && !this.cache.warnedUsers.includes(message.author.id) && !sanctioned
		if (userCanBeWarned && (spamMatches.length >= options.warnThreshold)) {
			this.warnUser(message, member, spamMatches)
			sanctioned = true
		} else if (userCanBeWarned && (duplicateMatches.length >= options.maxDuplicatesWarn)) {
			this.warnUser(message, member, [...duplicateMatches, ...spamOtherDuplicates])
			sanctioned = true
		}

		return sanctioned
	}

	/**
	 * Reset the cache of this AntiSpam client instance.
	 */
	reset () {
		this.cache = {
			messages: [],
			warnedUsers: [],
			mutedUsers: [],
		}
	}
}













    /*log(message, embed) {
        if (db.get(message.guild.id + '.loggingChannel')) {
            let channel = message.guild.channels.find(channel => channel.id === db.get(message.guild.id + '.loggingChannel') && channel.type === 'text');
            if (channel) {
                message.channel.send(embed)
            }
        }
    }

    embed(string) {
        if (string.toString() === 'author-warn') {
            embed.setTitle('Billybobbeep | Spam Prevention');
            embed.setDescription('You have been warned for spamming in ' + message.guild.name);
            embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);
            embed.setTimestamp();
            return embed;
        } else if (string.toString() === 'log-warn') {
            embed.setTitle('Spam Detected');
            embed.setDescription(`**Channel:** ${message.channel}\n**Author:** ${message.author}\n**Author Tag:** ${message.author.username}#${message.author.discriminator}\n**Author ID:** ${message.author.id}\n\n**Action:** Warned.`);
            return embed;
        } else if (string.toString() === 'author-mute') {
            embed.setTitle('Billybobbeep | Spam Prevention');
            embed.setDescription('You have been muted for spamming in ' + message.guild.name);
            embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);
            embed.setTimestamp();
            return embed;
        } else if (string.toString() === 'log-mute') {
            embed.setTitle('Spam Detected');
            embed.setDescription(`**Channel:** ${message.channel}\n**Author:** ${message.author}\n**Author Tag:** ${message.author.username}#${message.author.discriminator}\n**Author ID:** ${message.author.id}\n\n**Action:** Muted.`);
            return embed;
        } else if (string.toString() === 'log-mute-err') {
            embed.setTitle('Spam Detected');
            embed.setDescription(`**Channel:** ${message.channel}\n**Author:** ${message.author}\n**Author Tag:** ${message.author.username}#${message.author.discriminator}\n**Author ID:** ${message.author.id}\n\n**Action:** Muted.`);
            embed.setFooter(`User not notified.`);
            return embed;
        } else if (string.toString() === 'log-warn-err') {
            embed.setTitle('Spam Detected');
            embed.setDescription(`**Channel:** ${message.channel}\n**Author:** ${message.author}\n**Author Tag:** ${message.author.username}#${message.author.discriminator}\n**Author ID:** ${message.author.id}\n\n**Action:** Warned.`);
            embed.setFooter(`User not notified.`);
            return embed;
        } else {
            throw new TypeError('Invalid arguments whilst creating an embed.');
        }
    }

    async muteUser(message) {
        this.cache.messages = this.cache.messages.filter((u) => u.authorID !== message.author.id);
        this.cache.mutedUsers.push(message.author.id);
        let role = message.guild.roles.cache.find(role => role.id === db.get(message.guild.id + '.mutedRole'));
        let userCanBeMuted = message.guild.me.hasPermission('MANAGE_ROLES') && (message.guild.me.roles.highest.position > message.member.roles.highest.position);
        if (!userCanBeMuted) {
            message.channel.send(`Spam detected. Unable to mute due to premission error.`);
        } else {
            if (message.member.roles.cache.has(role.id)) return true;
            await message.member.roles.add(role, 'Spam Detected.');
            try {
                message.author.send(this.embed('author-mute'));
                this.log(message, this.embed('log-mute'));
            } catch {
                this.log(message, this.embed('log-mute-err'));
            }
        }
    }

    async warnUser(message) {
        this.cache.warnedUsers.push(message.author.id);
        try {
            message.author.send(this.embed('author-warn'));
            this.log(message, this.embed('log-warn'));
        } catch {
            this.log(message, this.embed('log-warn-err'));
        } finally {
            db.add(message.author.id + '.warnings', 1);
            db.push(message.author.id + '.warnReasons', 'Automatic Warn - Spamming.');
        }
    }

    /**
	 * Checks a message.
	 * @param {Discord.Message} message The message to check.
	 * @returns {Promise<boolean>} Whether the message has triggered a threshold.
	 * @example
	 * client.on('message', (msg) => {
	 * 	antiSpam.message(msg);
	 * });
	 */

    /*async message(message) {
        console.log(message.content)
        if (!message.guild || message.author.id === message.client.user.id || message.author.bot) return false;
        if (db.get(message.guild.id + '.antiSpam') === false) return false;

        const member = message.member || await message.guild.members.fetch(message.author);

        const currentMessage = {
			messageID: message.id,
			guildID: message.guild.id,
			authorID: message.author.id,
			channelID: message.channel.id,
			content: message.content,
			sentTimestamp: message.createdTimestamp
		}
        this.cache.messages.push(currentMessage);
        
        const cachedMessages = this.cache.messages.filter(m => m.authorID === message.author.id && m.guildID === message.guild.id);
        const duplicateMatches = cachedMessages.filter(m => m.content === message.content && (m.sentTimestamp > (currentMessage.sentTimestamp - maxDuplicatesInterval)))

        const spamOtherDuplicates = []
		if (duplicateMatches.length > 0) {
			let rowBroken = false
			cachedMessages.sort((a, b) => b.sentTimestamp - a.sentTimestamp).forEach(element => {
				if (rowBroken) return;
				if (element.content !== duplicateMatches[0].content) rowBroken = true;
				else spamOtherDuplicates.push(element);
			});
        }
        
        const spamMatches = cachedMessages.filter((m) => m.sentTimestamp > (Date.now() - maxInterval));

        let sanctioned = false
        const userCanBeMuted = muteEnabled && !this.cache.mutedUsers.includes(message.author.id) && !sanctioned;
		if (userCanBeMuted && (spamMatches.length >= muteThreshold)) {
			this.muteUser(message)
			sanctioned = true
		} else if (userCanBeMuted && (duplicateMatches.length >= maxDuplicatesMute)) {
			this.muteUser(message)
			sanctioned = true
        }
        
        const userCanBeWarned = warnEnabled && !this.cache.warnedUsers.includes(message.author.id) && !sanctioned
		if (userCanBeWarned && (spamMatches.length >= warnThreshold)) {
			this.warnUser(message)
			sanctioned = true
		} else if (userCanBeWarned && (duplicateMatches.length >= maxDuplicatesWarn)) {
			this.warnUser(message)
			sanctioned = true
		}

		return sanctioned
    }

    reset() {
		this.cache = {
			messages: [],
			warnedUsers: [],
			mutedUsers: []
		}
	}*/

module.exports = AntiSpamClient;