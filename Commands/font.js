const { MessageEmbed } = require("discord.js");
const embed = new MessageEmbed
module.exports = async (client, msg, args, prefix, message) => {
    var lines = ['', ''];
    var starter = '➳';
    
    function mainEmbed() {
        embed.setTitle('Billybobbeep | Fonts');
        embed.setDescription('Supported Fonts:\nDouble\nFancy')
        embed.setFooter(`Requested by: ${message.author.tag}`)
        embed.setTimestamp()
        embed.setColor('5A9EAB')
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
    } else {
        return message.channel.send('You have entered an invalid font.')
    }

    if (!args[1]) {
        message.reply('Please specify a message.')
    } else {
        try {
            for (var i = 0; i < args.slice(2).join(" ").length; i++) {
                var letter = args.join(" ")[i].toLowerCase();
                for (var j = 0; j < 1; j++) {
                    lines[j] += letters[letter] + ' ';
                }
            }
        message.channel.send(starter + lines.join("\n"))
        } catch {
            return message.channel.send('You have entered some invalid arguments.');
        }
    }
}