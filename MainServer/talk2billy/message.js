const settings = require('./settings.json');
const modules = require('./modules.js');
const configFile = require('../../config.json');

//Settings\\
let messageHello = [
  'hello',
  'hullo',
  'helo',
  'hi',
  'morning',
  'good morning',
  'hola',
  'hoi',
  'yo',
  'ola',
  'hi',
  'ahola',
  'alhoa',
  'wagwan',
  'welcome',
  'greetings',
  'billy'
];
let messageFeeling = [
  'how are you',
  'you good',
  'hows you',
  'how is you',
  'how r u',
  'hows u',
  'billy tell me your feelings'
];
let messageBye = [
  'bye',
  'night',
  'good night',
  'i leaving',
  "i'm leaving",
  "i'm leaving now",
  'cya',
  'bai',
  'im off',
  'right im off',
  'im leaving',
  'im leaving now'
];
let messageDoing = [
  'wyd',
  'wuu2',
  'wassup',
  'sup',
  'what you doing',
  'what u doing',
  'whats you up to',
  'what you up to',
  'what ya doing',
  'whatcha up 2',
  'whatcha up to',
  'whatcha up two'
];
let messageYeah = [
  'ye',
  'yea',
  'sure',
  'ofc',
  'of course',
  'yeeeeh',
  'yu',
  'yuh',
  'yuuh',
  'oo'
];
let messageOh = ['oh', 'o'];
let messageGood = ['good', 'alright', 'im'];
let messageBad = ['bad', ':(', ':c', 'd:', 'awful'];
let messageAgree = ['i agree', 'i do agree', 'i do not object'];
let messageDisagree = ['i disagree', 'i do not agree', 'i object', 'no'];
let messageLaugh = ['lol', 'xd', 'lmao', ':)', ':d', '(:', 'c:', ':p'];
let messageWhy = ['why', 'how come'];
let messageKnow = ['ikr', 'i know', 'i know right'];
let messageThanks = ['thank you', 'thank'];
let replySame = ['oop'];

module.exports = async (client, message) => {
  let inuse = false;
  if (message.author.bot) return;
  if (message.channel.id != configFile.talk2billy) return;
  messageHello.forEach(a => {
    if (message.content.toLowerCase().startsWith(a)) {
      if (inuse === true) return;
      inuse = true
      modules.hello(message);
    }
  });
  messageFeeling.forEach(a => {
    if (message.content.toLowerCase().startsWith(a)) {
      if (inuse === true) return;
      modules.feeling(message);
      inuse = true;
    }
  });
  messageBye.forEach(a => {
    if (message.content.toLowerCase().startsWith(a)) {
      if (inuse === true) return;
      inuse = true;
      modules.bye(message);
    }
  });
  messageDoing.forEach(a => {
    if (message.content.toLowerCase().startsWith(a)) {
      if (inuse === true) return;
      inuse = true;
      modules.doing(message);
    }
  });
  messageYeah.forEach(a => {
    if (message.content.toLowerCase().startsWith(a)) {
      if (inuse === true) return;
      inuse = true;
      modules.yeah(message);
    }
  });
  messageOh.forEach(a => {
    if (message.content.toLowerCase().startsWith(a)) {
      if (inuse === true) return;
      if (message.content.toLowerCase() === 'o' || message.content.toLowerCase().startWith('oh')) {
        inuse = true;
        modules.oh(message);
      }
    }
  });
  messageGood.forEach(a => {
    if (message.content.toLowerCase().startsWith(a)) {
      if (inuse === true) return;
      inuse = true;
      if (message.content.includes('bad', 'not good'))
        return modules.bad(message);
      modules.good(message);
    }
  });
  messageBad.forEach(a => {
    if (message.content.toLowerCase().startsWith(a) || message.content.toLowerCase().endsWith(a)) {
      if (inuse === true) return;
      inuse = true;
      modules.bad(message);
    }
  });
  messageAgree.forEach(a => {
    if (message.content.toLowerCase().startsWith(a)) {
      if (inuse === true) return;
      inuse = true;
      modules.agree(message);
    }
  });
  messageDisagree.forEach(a => {
    if (message.content.toLowerCase().startsWith(a)) {
      if (inuse === true) return;
      inuse = true;
      modules.disagree(message);
    }
  });
  messageLaugh.forEach(a => {
    if (message.content.toLowerCase().startsWith(a)) {
      if (inuse === true) return;
      inuse = true;
      modules.laugh(message);
    }
  });
  messageWhy.forEach(a => {
    if (message.content.toLowerCase().startsWith(a)) {
      if (inuse === true) return;
      inuse = true;
      modules.why(message);
    }
  });
  messageKnow.forEach(a => {
    if (message.content.toLowerCase().startsWith(a) || message.content.toLowerCase().includes('iconic')) {
      if (inuse === true) return;
      inuse = true;
      modules.know(message);
    }
  });
  replySame.forEach(a => {
    if (message.content.toLowerCase().startsWith(a)) {
      if (inuse === true) return;
      inuse = true;
      modules.replySame(message);
    }
  });
  messageThanks.forEach(a => {
    if (message.content.toLowerCase().startsWith(a)) {
      if (inuse === true) return;
      inuse = true;
      modules.noProblem(message);
    }
  });
  if (inuse === false) {
    inuse = true;
    modules.unknownMsg(message)
  }
};
