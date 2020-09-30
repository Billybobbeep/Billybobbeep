

fs.readFile('message.json', 'utf8', function readFileCallback(err, data) {
  var stuff = JSON.parse(data);
  stuff.forEach(m => {
    if (m.userID == message.author.id) {
        var json = {
          "userID": m.userID,
          "userTag": message.author.tag,
        };
        stuff.push(json);
        stuff = JSON.stringify(stuff);
        fs.writeFile('shop.json', stuff, 'utf8', function() { });