/*
  let letters = {
    a : "",
    b : "",
    c : "",
    d : "",
    e : "",
    f : "",
    g : "",
    h : "",
    i : "",
    j : "",
    k : "",
    l : "",
    m : "",
    n : "",
    o : "",
    p : "",
    q : "",
    r : "",
    s : "",
    t : "",
    u : "",
    v : "",
    w : "",
    y : "",
    x : "",
    z : "",
    " " : " ",
    "/" : "/",
    "" : "",
    "," : ",",
    "{" : "{",
    "[" : "[",
    "}" : "}",
    "]" : "]",
    "+" : "+",
    "-" : "-",
    "_" : "_",
    ":" : ":",
    ";" : ";",
    "#" : "#",
    "~" : "~",
    "=" : "=",
    ")" : ")",
    "(" : "(",
    "*" : "*",
    "&" : "&",
    "^" : "^",
    "%" : "%",
    "$" : "$",
    "£" : "£",
    """ : """,
    "!" : "!",
    "|" : "|",
    "\\" : "",
    "¬" : "¬",
    "`" : "`",
    "¦" : "¦",
    1 : "1",
    2 : "2",
    3 : "3",
    4 : "4",
    5 : "5",
    6 : "6",
    7 : "7",
    8 : "8",
    9 : "9",
    0 : "0"
  }
*/

const { Client, CommandInteraction, SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "font",
  description: "Convert a message into another font",
  category: "generator",
  slashInfo: {
    enabled: true,
    public: true
  },
  /**
   * Get the command's slash info
   * @returns The slash information
   */
  getSlashInfo: function() {
    const builder = new SlashCommandBuilder();
    // Set basic command information
    builder.setName(this.name);
    builder.setDescription(this.description);
    // If the command can be used in DMs
    builder.setDMPermission(false);
    // Add an option to provide the new font
    builder.addStringOption((option) => {
      // Set the option name
      option.setName("font");
      // Set the option description
      option.setDescription("The font to convert the message to");
      // If the option is required
      option.setRequired(true);
      // Set the minimum and maximum length requirements
      option.addChoices({
        name: "fancy",
        value: "fancy"
      }, {
        name: "handwritten",
        value: "hand"
      }, {
        name: "cursed",
        value: "cursed"
      }, {
        name: "smooth",
        value: "smooth"
      }, {
        name: "small",
        value: "small"
      })
      // Return the option
      return option;
    });
    // Add an option to provide the message
    builder.addStringOption((option) => {
      // Set the option name
      option.setName("message");
      // Set the option description
      option.setDescription("The message to convert");
      // If the option is required
      option.setRequired(true);
      // Return the option
      return option;
    });
    // Return the information in JSON format
    return builder.toJSON();
  },
  /**
   * @param {string} font The font you'd like to recieve
   * @returns {object | string} The font letters
   */
  fonts: function(font) {
    let letters;
    if (typeof font !== "string") return "Invalid font";
    font = font.toLowerCase();

    if (font == "fancy") {
      letters = {
        a: "𝓪",
        b: "𝓫",
        c: "𝓬",
        d: "𝓭",
        e: "𝓮",
        f: "𝓯",
        g: "𝓰",
        h: "𝓱",
        i: "𝓲",
        j: "𝓳",
        k: "𝓴",
        l: "𝓵",
        m: "𝓶",
        n: "𝓷",
        o: "𝓸",
        p: "𝓹",
        q: "𝓺",
        r: "𝓻",
        s: "𝓼",
        t: "𝓽",
        u: "𝓾",
        v: "𝓿",
        w: "𝔀",
        y: "𝔂",
        x: "𝔁",
        z: "𝔃",
        " ": " ",
        "/": "/",
        "": "",
        ",": ",",
        "{": "{",
        "[": "[",
        "}": "}",
        "]": "]",
        "+": "+",
        "-": "-",
        _: "_",
        ":": ":",
        ";": ";",
        "#": "#",
        "~": "~",
        "=": "=",
        ")": ")",
        "(": "(",
        "*": "*",
        "&": "&",
        "^": "^",
        "%": "%",
        $: "$",
        "£": "£",
        "'": "'",
        '"': '"',
        "!": "!",
        "|": "|",
        "\\": "",
        "¬": "¬",
        "`": "`",
        "¦": "¦",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        0: "0",
      };
    } else if (font == "double") {
      letters = {
        a: "𝕒",
        b: "𝕓",
        c: "𝕔",
        d: "𝕕",
        e: "𝕖",
        f: "𝕗",
        g: "𝕘",
        h: "𝕙",
        i: "𝕚",
        j: "𝕛",
        k: "𝕜",
        l: "𝕝",
        m: "𝕞",
        n: "𝕟",
        o: "𝕠",
        p: "𝕡",
        q: "𝕢",
        r: "𝕣",
        s: "𝕤",
        t: "𝕥",
        u: "𝕦",
        v: "𝕧",
        w: "𝕨",
        y: "𝕪",
        x: "𝕩",
        z: "𝕫",
        " ": " ",
        "/": "/",
        "": "",
        ",": ",",
        "{": "{",
        "[": "[",
        "}": "}",
        "]": "]",
        "+": "+",
        "-": "-",
        _: "_",
        ":": ":",
        ";": ";",
        "#": "#",
        "~": "~",
        "=": "=",
        ")": ")",
        "(": "(",
        "*": "*",
        "&": "&",
        "^": "^",
        "%": "%",
        $: "$",
        "£": "£",
        "'": "'",
        '"': '"',
        "!": "!",
        "|": "|",
        "\\": "",
        "¬": "¬",
        "`": "`",
        "¦": "¦",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        0: "0",
      };
    } else if (font == "hand") {
      letters = {
        a: "𝒶",
        b: "𝒷",
        c: "𝒸",
        d: "𝒹",
        e: "𝑒",
        f: "𝒻",
        g: "𝑔",
        h: "𝒽",
        i: "𝒾",
        j: "𝒿",
        k: "𝓀",
        l: "𝓁",
        m: "𝓂",
        n: "𝓃",
        o: "𝑜",
        p: "𝓅",
        q: "𝓆",
        r: "𝓇",
        s: "𝓈",
        t: "𝓉",
        u: "𝓊",
        v: "𝓋",
        w: "𝓌",
        y: "𝓎",
        x: "𝓍",
        z: "𝓏",
        " ": " ",
        "/": "/",
        "": "",
        ",": ",",
        "{": "{",
        "[": "[",
        "}": "}",
        "]": "]",
        "+": "+",
        "-": "-",
        _: "_",
        ":": ":",
        ";": ";",
        "#": "#",
        "~": "~",
        "=": "=",
        ")": ")",
        "(": "(",
        "*": "*",
        "&": "&",
        "^": "^",
        "%": "%",
        $: "$",
        "£": "£",
        "'": "'",
        '"': '"',
        "!": "!",
        "|": "|",
        "\\": "",
        "¬": "¬",
        "`": "`",
        "¦": "¦",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        0: "0",
      };
    } else if (font == "cursed") {
      letters = {
        a: "a̸̟̲͙͓̮͔̻̍͒͗̒̒́̈́",
        b: "b̴͓̘̽̊͂͗",
        c: "c̶̢͕͉̫̼͕̭͎͓̭̄͑̔̈̕",
        d: "d̵̰̈́̽̕",
        e: "ė̴̢̺͍̤̮̐̐",
        f: " ̵̭̙͇͓͉̞̻͈͔̜̆́̈́f̶̧̡̹̜̠͂",
        g: "g̴͓̗͉͎̼̳̅̈́̐̎̏̎",
        h: "h̸̢̙͓̤̪͉̭̪̾͗̈́",
        i: "ḭ̵̗̺͋͋͊̑́͂̐́͑̚",
        j: "j̸̢̠͉̦̼̜̹͌̅͗͂̽́͆͒̐̚",
        k: "k̴̡̟͔̽̄͑̌̒̀",
        l: "ḻ̴̟͔̘͎̟̩͙̹̠̇̃̏̇͂̚͝",
        m: "m̶̺̙̮̒̓",
        n: "n̸͎̻̬͎͛̔͘͠",
        o: "o̸͙͚͍̊̋͐̈́͜",
        p: "ṕ̸̨̲̻̝̜̤̯̹̠̇͒̓̚͠",
        q: "q̶̗̣͕̜̜͕̗́̂̍̀͐",
        r: " ̸͖̯͇̪͔͔̖̐͛r̷̨̧̨̞͕͔͍̿",
        s: "s̶̢̲̺͍̗̼̤͚̳͓̑̿",
        t: "t̵̬͇̫̦̑͒̊͌͌͐͑̑̃̕",
        u: "u̸̻̾̇̊̀̈́̇̒̉̄͘",
        v: "v̵̧̨̹̯̆̑̂͌͒̈͂̓͗",
        w: " ̶̢̛͙̰̙̟̰͕̐͗́̔̍͜w̶̠̮͛̑́́̅̄",
        y: "y̴̰̋",
        x: "x̴̥̦̝̝́̃̅͗̈́͝",
        z: "z̶̘̙̰̪̣̻͉͂͒ͅ",
        " ": " ",
        "/": "/",
        "": "",
        ",": ",",
        "{": "{",
        "[": "[",
        "}": "}",
        "]": "]",
        "+": "+",
        "-": "-",
        _: "_",
        ":": ":",
        ";": ";",
        "#": "#",
        "~": "~",
        "=": "=",
        ")": ")",
        "(": "(",
        "*": "*",
        "&": "&",
        "^": "^",
        "%": "%",
        $: "$",
        "£": "£",
        "'": "'",
        '"': '"',
        "!": "!",
        "|": "|",
        "\\": "",
        "¬": "¬",
        "`": "`",
        "¦": "¦",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        0: "0",
      };
    } else if (font == "smooth") {
      letters = {
        a: "ᗩ",
        b: "ᗷ",
        c: "ᑕ",
        d: "ᗪ",
        e: "E",
        f: "ᖴ",
        g: "G",
        h: "ᕼ",
        i: "I",
        j: "ᒍ",
        k: "K",
        l: "ᒪ",
        m: "ᗰ",
        n: "ᑎ",
        o: "O",
        p: "ᑭ",
        q: "ᑫ",
        r: "ᖇ",
        s: "ᔕ",
        t: "T",
        u: "ᑌ",
        v: "ᐯ",
        w: "ᗯ",
        y: "Y",
        x: "᙭",
        z: "ᘔ",
        " ": " ",
        "/": "/",
        "": "",
        ",": ",",
        "{": "{",
        "[": "[",
        "}": "}",
        "]": "]",
        "+": "+",
        "-": "-",
        _: "_",
        ":": ":",
        ";": ";",
        "#": "#",
        "~": "~",
        "=": "=",
        ")": ")",
        "(": "(",
        "*": "*",
        "&": "&",
        "^": "^",
        "%": "%",
        $: "$",
        "£": "£",
        "'": "'",
        '"': '"',
        "!": "!",
        "|": "|",
        "\\": "",
        "¬": "¬",
        "`": "`",
        "¦": "¦",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        0: "0",
      };
    } else if (font == "smol" || font == "small") {
      letters = {
        a: "α",
        b: "в",
        c: "¢",
        d: "∂",
        e: "є",
        f: "f",
        g: "g",
        h: "н",
        i: "ι",
        j: "ʝ",
        k: "к",
        l: "ℓ",
        m: "м",
        n: "и",
        o: "σ",
        p: "ρ",
        q: "q",
        r: "я",
        s: "ѕ",
        t: "т",
        u: "υ",
        v: "ν",
        w: "ω",
        y: "у",
        x: "χ",
        z: "z",
        " ": " ",
        "/": "/",
        "": "",
        ",": ",",
        "{": "{",
        "[": "[",
        "}": "}",
        "]": "]",
        "+": "+",
        "-": "-",
        _: "_",
        ":": ":",
        ";": ";",
        "#": "#",
        "~": "~",
        "=": "=",
        ")": ")",
        "(": "(",
        "*": "*",
        "&": "&",
        "^": "^",
        "%": "%",
        $: "$",
        "£": "£",
        "'": "'",
        '"': '"',
        "!": "!",
        "|": "|",
        "\\": "",
        "¬": "¬",
        "`": "`",
        "¦": "¦",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        0: "0",
      };
    } else return `${font} does not exist`;
    return letters;
  },
  /**
   * @param {Object} message
   * @returns The help embed
   */
  help: function(message) {
    const { MessageEmbed } = require("discord.js");
    const guildData = require("../../events/client/database/models/guilds");
    const embed = new MessageEmbed();
    guildData
      .findOne({ guildId: message.guild?.id || message.guild_id })
      .then((result) => {
        embed.setTitle("Billybobbeep | Fonts");
        embed.setDescription(
          "Supported Fonts:\nDouble\nFancy\nHand\nCursed\nSmooth\nSmol"
        );
        embed.setTimestamp();
        embed.setColor(
          result.preferences ? result.preferences.embedColor : "#447ba1"
        );
        return embed;
      });
  },
  /**
   * Execute the selected command
   * @param {CommandInteraction} interaction The interaction that was sent
   * @param {Client} client The bots client
   */
  execute: function(interaction, client) {
    // Find the provided options
    let font = (interaction.options.data).find((option) => option.name == "font")?.value;
    let msg = (interaction.options.data).find((option) => option.name == "message")?.value;

    if (!font || !msg)
      return interaction.reply({ content: "Invalid arguments, ensure all required arguments have been provided", ephemeral: true });

    let lines = "";
    let starter = "➳";
    let letters = this.fonts(font);

    if (typeof letters == "string")
      return interaction.reply({ content: letters, ephemeral: true });

    try {
      for (let i = 0; i < msg.length; i++) {
        let letter = msg[i].toLowerCase();
        for (let j = 0; j < 1; j++) {
          if (!letters[letter]) continue;
          lines += letters[letter];
        }
      }
      
      if (font === "fancy")
        interaction.reply({ content: starter + lines, ephemeral: false });
      else
        interaction.reply({ content: lines, ephemeral: false });
    } catch {
      interaction.reply({ content: "Something went wrong, try again later", ephemeral: true });
    }
  }
}