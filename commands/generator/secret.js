let letters = {
	a: "a",
	b: "b",
	c: "c",
	d: "d",
	e: "e",
	f: "f",
	g: "g",
	h: "h",
	i: "i",
	j: "j",
	k: "k",
	l: "l",
	m: "m",
	n: "n",
	o: "o",
	p: "p",
	q: "q",
	r: "r",
	s: "ѕ",
	t: "t",
	u: "u",
	v: "v",
	w: "w",
	y: "у",
	x: "x",
	z: "z",
	A: "A",
	B: "B",
	C: "C",
	D: "D",
	E: "E",
	F: "F",
	G: "G",
	H: "H",
	I: "i",
	J: "J",
	K: "K",
	L: "L",
	M: "M",
	N: "N",
	O: "O",
	P: "P",
	Q: "Q",
	R: "R",
	S: "S",
	T: "T",
	U: "U",
	V: "V",
	W: "W",
	Y: "Y",
	X: "X",
	Z: "Z",
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
	"_": "_",
	":": ":",
	";": ";",
	"#": "#",
	"~": "",
	"=": "=",
	")": ")",
	"(": "(",
	"*": "",
	"&": "&",
	"^": "^",
	"%": "%",
	"$": "$",
	"£": "£",
	"'": "'",
    "\"": "\"",
	"!": "!",
	"|": "",
	"\\": "",
	"¬": "¬",
	"`": "",
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
	0: "0"
}

module.exports = {
	name: "secret",
	description: "Repeat what you just said in a spoiler format",
	catagory: "generator",
	usage: "secret [message]",
	guildOnly: true,
	//options: [{ name: "message", description: "The message to repeat", type: 3, required: false }],
	/**
	   * @param {Object} message The message that was sent
	   * @param {String} prefix The servers prefix
	   * @param {Client} client The bots client
	   */
	execute(message, prefix, _client) {
		let args = message.content.slice(prefix.length).trim().split(/ +/g);
		if (!args) return message.channel.send("You must provide a message to send");

		for (let i = 0; i < args.slice(1).join(" ").length; i++) {
			let letter = args.slice(1).join(" ")[i];
			for (let j = 0; j < 1; j++) {
				if (letters[letter])
					lines[j] += letters[letter] || letter + "";
			}
		}

		if (!lines) return;
		message.channel.send(`||${lines.join("")}||`);
		message.delete();
	}
}