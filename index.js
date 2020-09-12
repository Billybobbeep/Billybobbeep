// [24/7 Hosting] //
const express = require('express')
const app = express()
const port = 3000
app.get('/', (req, res) => res.send("<!DOCTYPE html> <html> <head><title>Billybobbeep</title><link href=\"https://fonts.googleapis.com/css2?family=Satisfy&display=swap\" rel=\"stylesheet\"><link href=\"https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap\" rel=\"stylesheet\"> <link href=\"https://fonts.googleapis.com/css2?family=Sniglet&display=swap\" rel=\"stylesheet\"> </head> <style>body {background-color: black;} h2 { font-family: 'Dancing Script', cursive; font-size: 30px; color: #9ef0e5; } h1 { font-family: 'Sniglet', cursive; font-size: 20px; color: #4ab0f0; } h3 {font-family: 'Sniglet', cursive; font-size: 15px; color: #1479fc; } a { text-decoration: none; color: #1479fc; } .text { cursor: default; } .background { background-color: white; display: relative; position: relative;justify-content: center; align-content: center; width: 100%; height: 100% border: black; border-radius: 10px; padding-top: 20px; padding-bottom: 20px; padding-left: 20px; width: 50%;} </style><body><div class=\"background\"><h2 class=\"text\">Billybobbeep is currently online</h2><br><br><h1 class=\"text\">Info:</h1><h3 class=\"text\"><strong>Built for - </strong>Squiddies <a href=\"https://discord.gg/qNJEj3s\" target=\"null\">(https://discord.gg/qNJEj3s)</a></h3><h3 class=\"text\"><strong>Built by - </strong> Spoink#2793</h3></div></body></html>"))
app.listen(port, () => {
  console.log(`Your app is listening at http://localhost:${port}`)
})

//https://billybobbeep.tyler2p.repl.co/
const mainFile = require(`./bot.js`);
        mainFile()