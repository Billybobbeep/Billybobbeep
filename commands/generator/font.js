/*
        let letters = {
            a : '',
            b : '',
            c : '',
            d : '',
            e : '',
            f : '',
            g : '',
            h : '',
            i : '',
            j : '',
            k : '',
            l : '',
            m : '',
            n : '',
            o : '',
            p : '',
            q : '',
            r : '',
            s : '',
            t : '',
            u : '',
            v : '',
            w : '',
            y : '',
            x : '',
            z : '',
            ' ' : ' ',
            '/' : '/',
            '' : '',
            ',' : ',',
            '{' : '{',
            '[' : '[',
            '}' : '}',
            ']' : ']',
            '+' : '+',
            '-' : '-',
            '_' : '_',
            ':' : ':',
            ';' : ';',
            '#' : '#',
            '~' : '~',
            '=' : '=',
            ')' : ')',
            '(' : '(',
            '*' : '*',
            '&' : '&',
            '^' : '^',
            '%' : '%',
            '$' : '$',
            '£' : '£',
            '"' : '"',
            '!' : '!',
            '|' : '|',
            '\\' : '',
            '¬' : '¬',
            '`' : '`',
            '¦' : '¦',
            1 : '1',
            2 : '2',
            3 : '3',
            4 : '4',
            5 : '5',
            6 : '6',
            7 : '7',
            8 : '8',
            9 : '9',
            0 : '0'
        }
*/

module.exports = {
    name: 'font',
    description: 'Put your message into a new font',
    alias: ['fonts'],
    catagory: 'generator',
    slashInfo: { enabled: true, public: true },
    options: [{ name: 'font_name', description: 'The name of the font you\'d like to use', type: 3, required: true },
    { name: 'message', description: 'The message you\'d like to convert', type: 3, required: true }],
    /**
     * @param {String} font The font you'd like to recieve
     * @returns The font letters
     */
    fonts(font) {
        let letters;
        if (typeof font !== 'string') return message.channel.send(`Expected font to be string, recieved ${typeof font}`);
        font = font.toLowerCase();
        if (font == 'fancy') {
            letters = {
                a: '𝓪',
                b: '𝓫',
                c: '𝓬',
                d: '𝓭',
                e: '𝓮',
                f: '𝓯',
                g: '𝓰',
                h: '𝓱',
                i: '𝓲',
                j: '𝓳',
                k: '𝓴',
                l: '𝓵',
                m: '𝓶',
                n: '𝓷',
                o: '𝓸',
                p: '𝓹',
                q: '𝓺',
                r: '𝓻',
                s: '𝓼',
                t: '𝓽',
                u: '𝓾',
                v: '𝓿',
                w: '𝔀',
                y: '𝔂',
                x: '𝔁',
                z: '𝔃',
                ' ': ' ',
                '/': '/',
                '': '',
                ',': ',',
                '{': '{',
                '[': '[',
                '}': '}',
                ']': ']',
                '+': '+',
                '-': '-',
                '_': '_',
                ':': ':',
                ';': ';',
                '#': '#',
                '~': '~',
                '=': '=',
                ')': ')',
                '(': '(',
                '*': '*',
                '&': '&',
                '^': '^',
                '%': '%',
                '$': '$',
                '£': '£',
                '"': '"',
                '!': '!',
                '|': '|',
                '\\': '',
                '¬': '¬',
                '`': '`',
                '¦': '¦',
                1: '1',
                2: '2',
                3: '3',
                4: '4',
                5: '5',
                6: '6',
                7: '7',
                8: '8',
                9: '9',
                0: '0'
            }
        } else if (font == 'double') {
            letters = {
                a: '𝕒',
                b: '𝕓',
                c: '𝕔',
                d: '𝕕',
                e: '𝕖',
                f: '𝕗',
                g: '𝕘',
                h: '𝕙',
                i: '𝕚',
                j: '𝕛',
                k: '𝕜',
                l: '𝕝',
                m: '𝕞',
                n: '𝕟',
                o: '𝕠',
                p: '𝕡',
                q: '𝕢',
                r: '𝕣',
                s: '𝕤',
                t: '𝕥',
                u: '𝕦',
                v: '𝕧',
                w: '𝕨',
                y: '𝕪',
                x: '𝕩',
                z: '𝕫',
                ' ': ' ',
                '/': '/',
                '': '',
                ',': ',',
                '{': '{',
                '[': '[',
                '}': '}',
                ']': ']',
                '+': '+',
                '-': '-',
                '_': '_',
                ':': ':',
                ';': ';',
                '#': '#',
                '~': '~',
                '=': '=',
                ')': ')',
                '(': '(',
                '*': '*',
                '&': '&',
                '^': '^',
                '%': '%',
                '$': '$',
                '£': '£',
                '"': '"',
                '!': '!',
                '|': '|',
                '\\': '',
                '¬': '¬',
                '`': '`',
                '¦': '¦',
                1: '1',
                2: '2',
                3: '3',
                4: '4',
                5: '5',
                6: '6',
                7: '7',
                8: '8',
                9: '9',
                0: '0'
            }
        } else if (font == 'hand') {
            letters = {
                a: '𝒶',
                b: '𝒷',
                c: '𝒸',
                d: '𝒹',
                e: '𝑒',
                f: '𝒻',
                g: '𝑔',
                h: '𝒽',
                i: '𝒾',
                j: '𝒿',
                k: '𝓀',
                l: '𝓁',
                m: '𝓂',
                n: '𝓃',
                o: '𝑜',
                p: '𝓅',
                q: '𝓆',
                r: '𝓇',
                s: '𝓈',
                t: '𝓉',
                u: '𝓊',
                v: '𝓋',
                w: '𝓌',
                y: '𝓎',
                x: '𝓍',
                z: '𝓏',
                ' ': ' ',
                '/': '/',
                '': '',
                ',': ',',
                '{': '{',
                '[': '[',
                '}': '}',
                ']': ']',
                '+': '+',
                '-': '-',
                '_': '_',
                ':': ':',
                ';': ';',
                '#': '#',
                '~': '~',
                '=': '=',
                ')': ')',
                '(': '(',
                '*': '*',
                '&': '&',
                '^': '^',
                '%': '%',
                '$': '$',
                '£': '£',
                '"': '"',
                '!': '!',
                '|': '|',
                '\\': '',
                '¬': '¬',
                '`': '`',
                '¦': '¦',
                1: '1',
                2: '2',
                3: '3',
                4: '4',
                5: '5',
                6: '6',
                7: '7',
                8: '8',
                9: '9',
                0: '0'
            }
        } else if (font == 'cursed') {
            letters = {
                a: 'a̸̟̲͙͓̮͔̻̍͒͗̒̒́̈́',
                b: 'b̴͓̘̽̊͂͗',
                c: 'c̶̢͕͉̫̼͕̭͎͓̭̄͑̔̈̕',
                d: 'd̵̰̈́̽̕',
                e: 'ė̴̢̺͍̤̮̐̐',
                f: ' ̵̭̙͇͓͉̞̻͈͔̜̆́̈́f̶̧̡̹̜̠͂',
                g: 'g̴͓̗͉͎̼̳̅̈́̐̎̏̎',
                h: 'h̸̢̙͓̤̪͉̭̪̾͗̈́',
                i: 'ḭ̵̗̺͋͋͊̑́͂̐́͑̚',
                j: 'j̸̢̠͉̦̼̜̹͌̅͗͂̽́͆͒̐̚',
                k: 'k̴̡̟͔̽̄͑̌̒̀',
                l: 'ḻ̴̟͔̘͎̟̩͙̹̠̇̃̏̇͂̚͝',
                m: 'm̶̺̙̮̒̓',
                n: 'n̸͎̻̬͎͛̔͘͠',
                o: 'o̸͙͚͍̊̋͐̈́͜',
                p: 'ṕ̸̨̲̻̝̜̤̯̹̠̇͒̓̚͠',
                q: 'q̶̗̣͕̜̜͕̗́̂̍̀͐',
                r: ' ̸͖̯͇̪͔͔̖̐͛r̷̨̧̨̞͕͔͍̿',
                s: 's̶̢̲̺͍̗̼̤͚̳͓̑̿',
                t: 't̵̬͇̫̦̑͒̊͌͌͐͑̑̃̕',
                u: 'u̸̻̾̇̊̀̈́̇̒̉̄͘',
                v: 'v̵̧̨̹̯̆̑̂͌͒̈͂̓͗',
                w: ' ̶̢̛͙̰̙̟̰͕̐͗́̔̍͜w̶̠̮͛̑́́̅̄',
                y: 'y̴̰̋',
                x: 'x̴̥̦̝̝́̃̅͗̈́͝',
                z: 'z̶̘̙̰̪̣̻͉͂͒ͅ',
                ' ': ' ',
                '/': '/',
                '': '',
                ',': ',',
                '{': '{',
                '[': '[',
                '}': '}',
                ']': ']',
                '+': '+',
                '-': '-',
                '_': '_',
                ':': ':',
                ';': ';',
                '#': '#',
                '~': '~',
                '=': '=',
                ')': ')',
                '(': '(',
                '*': '*',
                '&': '&',
                '^': '^',
                '%': '%',
                '$': '$',
                '£': '£',
                '"': '"',
                '!': '!',
                '|': '|',
                '\\': '',
                '¬': '¬',
                '`': '`',
                '¦': '¦',
                1: '1',
                2: '2',
                3: '3',
                4: '4',
                5: '5',
                6: '6',
                7: '7',
                8: '8',
                9: '9',
                0: '0'
            }
        } else if (font == 'smooth') {
            letters = {
                a: 'ᗩ',
                b: 'ᗷ',
                c: 'ᑕ',
                d: 'ᗪ',
                e: 'E',
                f: 'ᖴ',
                g: 'G',
                h: 'ᕼ',
                i: 'I',
                j: 'ᒍ',
                k: 'K',
                l: 'ᒪ',
                m: 'ᗰ',
                n: 'ᑎ',
                o: 'O',
                p: 'ᑭ',
                q: 'ᑫ',
                r: 'ᖇ',
                s: 'ᔕ',
                t: 'T',
                u: 'ᑌ',
                v: 'ᐯ',
                w: 'ᗯ',
                y: 'Y',
                x: '᙭',
                z: 'ᘔ',
                ' ': ' ',
                '/': '/',
                '': '',
                ',': ',',
                '{': '{',
                '[': '[',
                '}': '}',
                ']': ']',
                '+': '+',
                '-': '-',
                '_': '_',
                ':': ':',
                ';': ';',
                '#': '#',
                '~': '~',
                '=': '=',
                ')': ')',
                '(': '(',
                '*': '*',
                '&': '&',
                '^': '^',
                '%': '%',
                '$': '$',
                '£': '£',
                '"': '"',
                '!': '!',
                '|': '|',
                '\\': '',
                '¬': '¬',
                '`': '`',
                '¦': '¦',
                1: '1',
                2: '2',
                3: '3',
                4: '4',
                5: '5',
                6: '6',
                7: '7',
                8: '8',
                9: '9',
                0: '0'
            }
        } else if (font == 'smol') {
            letters = {
                a: 'α',
                b: 'в',
                c: '¢',
                d: '∂',
                e: 'є',
                f: 'f',
                g: 'g',
                h: 'н',
                i: 'ι',
                j: 'ʝ',
                k: 'к',
                l: 'ℓ',
                m: 'м',
                n: 'и',
                o: 'σ',
                p: 'ρ',
                q: 'q',
                r: 'я',
                s: 'ѕ',
                t: 'т',
                u: 'υ',
                v: 'ν',
                w: 'ω',
                y: 'у',
                x: 'χ',
                z: 'z',
                ' ': ' ',
                '/': '/',
                '': '',
                ',': ',',
                '{': '{',
                '[': '[',
                '}': '}',
                ']': ']',
                '+': '+',
                '-': '-',
                '_': '_',
                ':': ':',
                ';': ';',
                '#': '#',
                '~': '~',
                '=': '=',
                ')': ')',
                '(': '(',
                '*': '*',
                '&': '&',
                '^': '^',
                '%': '%',
                '$': '$',
                '£': '£',
                '"': '"',
                '!': '!',
                '|': '|',
                '\\': '',
                '¬': '¬',
                '`': '`',
                '¦': '¦',
                1: '1',
                2: '2',
                3: '3',
                4: '4',
                5: '5',
                6: '6',
                7: '7',
                8: '8',
                9: '9',
                0: '0'
            }
        } else
            return `${font} does not exist`;
        return letters;
    },
    /**
     * @param {Object} message
     * @returns The help embed
     */
    help(message) {
        const { MessageEmbed } = require('discord.js');
        const guildData = require('../../events/client/database/models/guilds');
        const embed = new MessageEmbed();
        guildData.findOne({ guildId: message.guild?.id || message.guild_id }).then(result => {
            embed.setTitle('Billybobbeep | Fonts');
            embed.setDescription('Supported Fonts:\nDouble\nFancy\nHand\nCursed\nSmooth\nSmol');
            embed.setFooter(`Requested by: ${(message.author ? message.author.tag : message.member.user.username + message.member.user.discriminator)}`);
            embed.setTimestamp();
            embed.setColor(result.preferences ? result.preferences.embedColor : '#447ba1');
            return embed;
        });
    },
    /**
     * Execute the selected command
     * @param {Object} message The message that was sent
     * @param {String} prefix The servers prefix
     * @param {Client} client The bots client
     */
    execute(message, prefix, client) {
        if (message.data) {
            let args = message.data.options
            let lines = [];
            let starter = '➳';
            let letters;

            if (!args[0]) return require('../../utils/functions').slashCommands.reply(message, client, 'You must provide a font');
            letters = this.fonts(args[0].value);
            if (typeof letters == 'string') return require('../../utils/functions').slashCommands.reply(message, client, letters);

            if (!args[1])
                require('../../utils/functions').slashCommands.reply(message, client, 'You must provide a message to convert');
            else {
                try {
                    for (let i = 0; i < (args[1].value).length; i++) {
                        let letter = (args[1].value)[i].toLowerCase();
                        for (let j = 0; j < 1; j++) {
                            lines[j] += letters[letter] + '';
                        }
                    }
                    require('../../utils/functions').slashCommands.reply(message, client, (starter + lines.join('\n')));
                } catch {
                    require('../../utils/functions').slashCommands.reply(message, client, 'Internal error, try again later');
                }
            }
        } else {
            let args = message.content.slice(prefix.length).trim().split(/ +/g);
            let lines = ['', ''];
            let starter = '➳';
            let letters;

            if (message.content.toLowerCase() === prefix + 'font' || message.content.toLowerCase() === prefix + 'fonts') return message.channel/send(this.help(message));
            if (!args[1]) return message.channel.send('You must provide a font');
            letters = this.fonts(args[1]);
            if (typeof letters == 'string') return message.channel.send(letters);

            if (!args[2])
                message.channel.send(`<@!${message.author ? message.author.id : message.member.user.id}>, You must provide a message`);
            else {
                try {
                    for (let i = 0; i < args.slice(2).join(' ').length; i++) {
                        let letter = args.slice(2).join(' ')[i].toLowerCase();
                        for (let j = 0; j < 1; j++) {
                            lines[j] += letters[letter] + '';
                        }
                    }
                    message.channel.send(starter + lines.join('\n'));
                } catch {
                    return message.channel.send('Internal error, try again later');
                }
            }
        }
    }
}