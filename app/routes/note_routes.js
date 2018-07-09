module.exports = function(app, db) {

	var ObjectID = require('mongodb').ObjectID;

	app.get('/notes', (req, res) => {
		db.collection('notes').find({}).toArray(function(err, items) {
		    // console.log("Found records");
		    // console.log(items);
		    let html = '';
		    for (let i = 0; i < items.length; i++) {
		    	html += `<div>`;
			    html +=   `<h3><a href="/notes/${items[i]._id}">${items[i].title}</a></h3>`;
			    html +=   `<p>${items[i].text}</p>`;
		    	html += `</div>`;
		    	html += `<hr/>`;
		    }

		    res.send(html);
		});
	});

	app.get('/notes/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('notes').findOne(details, (err, item) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send(item);
			}
		});
	});

	app.delete('/notes/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('notes').remove(details, (err, item) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send('Note ' + id + ' deleted!');
			} 
		});
	});

  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
	const details = { '_id': new ObjectID(id) };
	const note = { text: req.body.body, title: req.body.title };
	db.collection('notes').update(details, note, (err, result) => {
		if (err) {
			res.send({'error':'An error has occurred'});
		} else {
			res.send(note);
		} 
	});
});

	app.post('/notes', (req, res) => {
    	const note = { text: req.body.body, title: req.body.title};
    	db.collection('notes').insert(note, (err, result) => {
			if (err) { 
				res.send({ 'error': 'An error has occurred' }); 
			} else {
				res.send(result.ops[0]);
			}
		});
  	});
};