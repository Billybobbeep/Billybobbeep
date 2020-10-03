module.exports = async (client, msg, args, prefix, message) => {
    var lines = ['', ''];
    var starter = '➳';
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
        z:  '𝔃'
    }

    if (!args[0]) {
        message.reply('Please specify a message.')
    } else {
        for (var i = 0; i < args.join(" ").length; i++) {
            var letter = args.join(" ")[i].toLowerCase();
            for (var j = 0; j < 1; j++) {
                lines[j] += letters[letter] + '';
            }
        }
    message.channel.send(starter + lines.join("\n"))
    }
}