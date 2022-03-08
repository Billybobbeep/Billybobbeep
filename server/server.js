module.exports = function(client) {
    const express = require("express");
    const app = express();
    const bodyParser = require("body-parser");
    const userData = require("../events/client/database/models/users");
    const { MessageEmbed } = require("discord.js");

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.urlencoded({ extended: true }));

    let cache = {
        lastVote: false,
        lastVoteDate: false,
        releasedVersions: ["v1"]
    }

    /**
     * Give users credit for upvoting the bot
     * @param {*} req The incoming HTTP request
     * @param {*} res The outgoing response
     * @param {Object} site The site the user voted on
     * @example userVoted(req, res, { name: "example.com", link: "example.com/billybobbeep" })
     */
    async function userVoted(req, res, site) {
        let user = false;
        let c = true;
        user = await client.users.fetch(req.body.user || req.body.id).catch(() => c = false && res.status(500).json({ error: "Could not find user" }));
        if (!c) return;
        if (
            typeof cache.lastVote == "object" &&
            cache.lastVoteDate < new Date().getTime() + 60000 &&
            cache.lastVote.user == req.body.user &&
            cache.lastVote.site == site.name
        ) return res.send({ error: user.username + " has already voted" });
        if (user) {
            userData.findOne({ userId: req.body.user || req.body.id }).then(async result => {
                if (!result) return res.status(500).json({ error: "Could not find user", response: 500 });
                const embed = new MessageEmbed();
                embed.setTitle("Thank you for voting!");
                embed.setDescription(`You have recieved \`$100\` for voting on [${site.name}](${site.link})`);
                embed.setColor("#447ba1");
                await user.send({ embeds: [embed] }).catch(() => c = false && res.json({ error: "User has DMs turned off" }));
                result.economy_balance = result.economy_balance + 100;
                result.save();
                let votersChannel = await client.channels.fetch(process.env.votersChannel);
                embed.setTitle(`${user.username}#${user.discriminator} upvoted`);
                embed.setDescription(`${user.username} has upvoted on [${site.name}](${site.link})`);
                if (votersChannel) votersChannel.send({ embeds: [embed] });
                cache.lastVoteDate = new Date().getTime();
                cache.lastVote = { user: req.body.user || req.body.id, site: site.name }
                if (c)
                    res.json({ response: 200 });
            });
        } else
            res.json({ error: "Could not find user" });
    }

    app.all("/", function(req, res) {
        if ((req.method).toUpperCase() !== "GET")
            res.json({ website: "https://billybobbeep.com" });
        else
            res.status(301).redirect("https://billybbobeep.com");
    });
    app.post("/api/commands/:catagory", function(req, res) {
        if ((req.params.catagory).toLowerCase() == "all")
            res.json({ response: 200, data: client.commands });
        else {
            if (typeof client.commands !== "object")
                res.status(400).json({ response: 400, error: "No commands available" });
            else if ((client.commands).filter(x => typeof x.catagory == "string" && (x.catagory).toLowerCase() == (req.params.catagory).toLowerCase()).size > 0)
                res.json({ response: 200, data: (client.commands).filter(x => typeof x.catagory == "string" && (x.catagory).toLowerCase() == (req.params.catagory).toLowerCase()) });
            else
                res.status(400).json({ response: 400, error: "Catagory was not found" });
        }
    });
    app.post("/api/user/voted", function(req, res) {
        let data = { name: "top.gg", link: `https://top.gg/bot/${client.user.id}` }
        if (req.body.id && !req.body.user)
            data = { name: "discordbotlist.com", link: `https://discordbotlist.com/bots/${client.user.username}` }
        if (!client.readyTimestamp) {
            client.once("ready", () => {
                userVoted(req, res, data);
            });
        } else
            userVoted(req, res, data);
    });
    app.post("/api/user/voted/disc", function(req, res) {
        if (!client.readyTimestamp) {
            client.once("ready", () => {
                userVoted(req, res, { name: "discordbotlist.com", link: `https://discordbotlist.com/bots/${client.user.username}` });
            });
        } else
            userVoted(req, res, { name: "discordbotlist.com", link: `https://discordbotlist.com/bots/${client.user.username}` });
    });

    app.all("*", function(_req, res) {
        res.status(404).json({ error: "Cannot find what you're looking for", response: 404 });
    });
    app.use(function(req, res) {
        if (req.path.includes("/api"))
            res.status(408).json({ error: "Server Timeout", response: 408 });
        else
            res.status(408).render("errors/408");
    });

    app.listen(3000, () => console.log("Billybobbeep is online"));
}