const noteRoutes = require('./note_routes');
module.exports = function(app, db) {
  noteRoutes(app, db);
  // Other route groups could go here, in the future
  app.get('/', (req, res) => {
  	let html = '';
  	html += `<h1>Welcome to the Node API Home!</h1>`;
  	html += `<a href="/notes">Notes</a>`;

    res.send(html);
  });
};