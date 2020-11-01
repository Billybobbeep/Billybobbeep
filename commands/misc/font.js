/*
        var letters = {
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
            ' ' : ' '
        }
*/
const { MessageEmbed } = require("discord.js");
const embed = new MessageEmbed()
const db = require('../../data/databaseManager/index.js');

module.exports = {
    name: 'font',
    description: 'Put your message into a new font.',
    guildOnly: true,
    execute (message, prefix, client) {
    var lines = ['', ''];
    var starter = '➳';
    
    function mainEmbed() {
        embed.setTitle('Billybobbeep | Fonts');
        embed.setDescription('Supported Fonts:\nDouble\nFancy\nHand\nCursed\nSmooth\nSmol')
        embed.setFooter(`Requested by: ${message.author.tag}`)
        embed.setTimestamp()
        embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
        return message.channel.send(embed)
    }

    if (message.content.toLowerCase() === prefix + 'font' || message.content.toLowerCase() === prefix + 'fonts') return mainEmbed()
    if (!args[0]) return message.channel.send('Please specify a font.')
    if (args[0].toLowerCase() === 'fancy') {
        var letters = {
            a : '𝓪',
            b : '𝓫',
            c : '𝓬',
            d : '𝓭',
            e : '𝓮',
            f : '𝓯',
            g : '𝓰',
            h : '𝓱',
            i : '𝓲',
            j : '𝓳',
            k : '𝓴',
            l : '𝓵',
            m : '𝓶',
            n : '𝓷',
            o : '𝓸',
            p : '𝓹',
            q : '𝓺',
            r : '𝓻',
            s : '𝓼',
            t : '𝓽',
            u : '𝓾',
            v : '𝓿',
            w : '𝔀',
            y : '𝔂',
            x : '𝔁',
            z : '𝔃',
            ' ' : ' '
        }
    } else if (args[0].toLowerCase() === 'double') {
        var letters = {
            a : '𝕒',
            b : '𝕓',
            c : '𝕔',
            d : '𝕕',
            e : '𝕖',
            f : '𝕗',
            g : '𝕘',
            h : '𝕙',
            i : '𝕚',
            j : '𝕛',
            k : '𝕜',
            l : '𝕝',
            m : '𝕞',
            n : '𝕟',
            o : '𝕠',
            p : '𝕡',
            q : '𝕢',
            r : '𝕣',
            s : '𝕤',
            t : '𝕥',
            u : '𝕦',
            v : '𝕧',
            w : '𝕨',
            y : '𝕪',
            x : '𝕩',
            z : '𝕫',
            ' ' : ' '
        }
    }
    else if (args[0].toLowerCase() === 'hand') {
        var letters = {
            a : '𝒶',
            b : '𝒷',
            c : '𝒸',
            d : '𝒹',
            e : '𝑒',
            f : '𝒻',
            g : '𝑔',
            h : '𝒽',
            i : '𝒾',
            j : '𝒿',
            k : '𝓀',
            l : '𝓁',
            m : '𝓂',
            n : '𝓃',
            o : '𝑜',
            p : '𝓅',
            q : '𝓆',
            r : '𝓇',
            s : '𝓈',
            t : '𝓉',
            u : '𝓊',
            v : '𝓋',
            w : '𝓌',
            y : '𝓎',
            x : '𝓍',
            z : '𝓏',
            ' ' : ' '
        }
    } else if (args[0].toLowerCase() === 'cursed') {
        var letters = {
            a : 'a̸̟̲͙͓̮͔̻̍͒͗̒̒́̈́',
            b : 'b̴͓̘̽̊͂͗',
            c : 'c̶̢͕͉̫̼͕̭͎͓̭̄͑̔̈̕',
            d : 'd̵̰̈́̽̕',
            e : 'ė̴̢̺͍̤̮̐̐',
            f : ' ̵̭̙͇͓͉̞̻͈͔̜̆́̈́f̶̧̡̹̜̠͂',
            g : 'g̴͓̗͉͎̼̳̅̈́̐̎̏̎',
            h : 'h̸̢̙͓̤̪͉̭̪̾͗̈́',
            i : 'ḭ̵̗̺͋͋͊̑́͂̐́͑̚',
            j : 'j̸̢̠͉̦̼̜̹͌̅͗͂̽́͆͒̐̚',
            k : 'k̴̡̟͔̽̄͑̌̒̀',
            l : 'ḻ̴̟͔̘͎̟̩͙̹̠̇̃̏̇͂̚͝',
            m : 'm̶̺̙̮̒̓',
            n : 'n̸͎̻̬͎͛̔͘͠',
            o : 'o̸͙͚͍̊̋͐̈́͜',
            p : 'ṕ̸̨̲̻̝̜̤̯̹̠̇͒̓̚͠',
            q : 'q̶̗̣͕̜̜͕̗́̂̍̀͐',
            r : ' ̸͖̯͇̪͔͔̖̐͛r̷̨̧̨̞͕͔͍̿',
            s : 's̶̢̲̺͍̗̼̤͚̳͓̑̿',
            t : 't̵̬͇̫̦̑͒̊͌͌͐͑̑̃̕',
            u : 'u̸̻̾̇̊̀̈́̇̒̉̄͘',
            v : 'v̵̧̨̹̯̆̑̂͌͒̈͂̓͗',
            w : ' ̶̢̛͙̰̙̟̰͕̐͗́̔̍͜w̶̠̮͛̑́́̅̄',
            y : 'y̴̰̋',
            x : 'x̴̥̦̝̝́̃̅͗̈́͝',
            z : 'z̶̘̙̰̪̣̻͉͂͒ͅ',
            ' ' : ' '
        }
    }else if (args[0].toLowerCase() === 'smooth') {
        var letters = {
            a : 'ᗩ',
            b : 'ᗷ',
            c : 'ᑕ',
            d : 'ᗪ',
            e : 'E',
            f : 'ᖴ',
            g : 'G',
            h : 'ᕼ',
            i : 'I',
            j : 'ᒍ',
            k : 'K',
            l : 'ᒪ',
            m : 'ᗰ',
            n : 'ᑎ',
            o : 'O',
            p : 'ᑭ',
            q : 'ᑫ',
            r : 'ᖇ',
            s : 'ᔕ',
            t : 'T',
            u : 'ᑌ',
            v : 'ᐯ',
            w : 'ᗯ',
            y : 'Y',
            x : '᙭',
            z : 'ᘔ',
            ' ' : ' '
        }
    } else if (args[0].toLowerCase() === 'smol') {
        var letters = {
            a : 'α',
            b : 'в',
            c : '¢',
            d : '∂',
            e : 'є',
            f : 'f',
            g : 'g',
            h : 'н',
            i : 'ι',
            j : 'ʝ',
            k : 'к',
            l : 'ℓ',
            m : 'м',
            n : 'и',
            o : 'σ',
            p : 'ρ',
            q : 'q',
            r : 'я',
            s : 'ѕ',
            t : 'т',
            u : 'υ',
            v : 'ν',
            w : 'ω',
            y : 'у',
            x : 'χ',
            z : 'z',
            ' ' : ' '
        }
    } else {
        return message.channel.send('You have entered an invalid font.')
    }

    if (!args[1]) {
        message.reply('Please specify a message.')
    } else {
        try {
            for (var i = 0; i < args.slice(1).join(' ').length; i++) {
                var letter = args.slice(1).join(' ')[i].toLowerCase();
                for (var j = 0; j < 1; j++) {
                    lines[j] += letters[letter] + '';
                }
            }
        message.channel.send(starter + lines.join("\n"))
        } catch {
            return message.channel.send('You have entered some invalid arguments.');
        }
    }
}
}