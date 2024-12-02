const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Middleware pour ajouter l'auto-incrémentation des IDs
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === 'POST') {
    const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8'));

    if (!db[req.path.replace('/', '')]) {
      return next();
    }

    const resource = db[req.path.replace('/', '')];
    const nextId = resource.length > 0 ? Math.max(...resource.map((r) => r.id)) + 1 : 1;

    req.body.id = nextId; // Ajoute l'ID auto-incrémenté
  }
  next();
});

server.use(middlewares);
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});
