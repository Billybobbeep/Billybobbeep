var letters = {
  a : 'a',
  b : 'b',
  c : 'c',
  d : 'd',
  e : 'e',
  f : 'f',
  g : 'g',
  h : 'h',
  i : 'i',
  j : 'j',
  k : 'k',
  l : 'l',
  m : 'm',
  n : 'n',
  o : 'o',
  p : 'p',
  q : 'q',
  r : 'r',
  s : 'ѕ',
  t : 't',
  u : 'u',
  v : 'v',
  w : 'w',
  y : 'у',
  x : 'x',
  z : 'z',
  A : 'A',
  B : 'B',
  C : 'C',
  D : 'D',
  E : 'E',
  F : 'F',
  G : 'G',
  H : 'H',
  I : 'i',
  J : 'J',
  K : 'K',
  L : 'L',
  M : 'M',
  N : 'N',
  O : 'O',
  P : 'P',
  Q : 'Q',
  R : 'R',
  S : 'S',
  T : 'T',
  U : 'U',
  V : 'V',
  W : 'W',
  Y : 'Y',
  X : 'X',
  Z : 'Z',
  ' ' : ' ',
  '/' : '/',
  '.' : '.',
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
  '~' : '',
  '=' : '=',
  ')' : ')',
  '(' : '(',
  '*' : '',
  '&' : '&',
  '^' : '^',
  '%' : '%',
  '$' : '$',
  '£' : '£',
  '"' : '"',
  '!' : '!',
  '|' : '',
  '\\' : '',
  '¬' : '¬',
  '`' : '',
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

module.exports = {
  name: 'secret',
  description: 'Repeat what you just said in a spoiler format.',
  catagory: 'generator',
  usage: 'secret [message]',
  guildOnly: true,
  execute (message, prefix, client) {
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    var lines = ['', ''];
    
    if (!args) return message.channel.send('You must specify a message to send.');

    for (var i = 0; i < args.slice(1).join(' ').length; i++) {
      var letter = args.slice(1).join(' ')[i];
      for (var j = 0; j < 1; j++) {
          lines[j] += letters[letter] + '';
      }
  }
    console.log(lines)
    
    //if (message.content.includes('||')) return message.channel.send('You cannot include `||` in your message.');
    //if (message.content.toLowerCase().includes('/spoiler')) return message.chanel.send('You cannot include `/spoiler` in your message.');
    /*args.forEach(a => {
      if (a.toLowerCase() === '/spoiler') {
        args.splice(args.indexOf('/spoiler', 1));
      }
    });*/
    //if (!secretMessage) return;
    message.channel.send(`||${lines.join('')}||`);
    //message.delete();
  }
}