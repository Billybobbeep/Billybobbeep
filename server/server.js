module.exports = function(client) {
    const express = require('express');
    const app = express();

    app.all('/', function(req, res) {
        if ((req.method).toUpperCase() !== 'GET')
            res.json({ response: 200 });
        else
            res.send('working');
    });
    app.post('/api/commands/:catagory', function(req, res) {
        if ((req.params.catagory).toLowerCase() == 'all')
            res.json({ response: 200, data: client.commands });
        else {
            if (typeof client.commands !== 'object')
                res.status(400).json({ response: 400, error: 'No commands available' });
            else if ((client.commands).filter(x => typeof x.catagory == 'string' && (x.catagory).toLowerCase() == (req.params.catagory).toLowerCase()).size > 0)
                res.json({ response: 200, data: (client.commands).filter(x => typeof x.catagory == 'string' && (x.catagory).toLowerCase() == (req.params.catagory).toLowerCase()) });
            else
                res.status(400).json({ response: 400, error: 'Catagory was not found' });
        }
    });

    app.all('*', function(_req, res) {
        res.status(404).json({ error: 'Cannot find what you\'re looking for', response: 404 });
	});
	app.use(function(req, res) {
		if (req.path.includes('/api'))
			res.status(408).json({ error: 'Server Timeout', response: 408 });
		else
			res.status(408).render('errors/408');
	});

    app.listen(3000, () => console.log('online'))
}