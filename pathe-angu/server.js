const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Middleware pour ajouter l'auto-incrémentation des IDs
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === 'POST' && Array.isArray(req.body)) {
    const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8'));
    const resourceName = req.path.replace('/', '');

    if (db[resourceName]) {
      req.body.forEach(item => {
        delete item.id; // Supprimer l'ID si présent
        const nextId = db[resourceName].length > 0
          ? Math.max(...db[resourceName].map(r => r.id)) + 1
          : 1;
        item.id = nextId; // Assigner l'ID auto-incrémenté
      });
    }
  }
  next();
});


server.use(middlewares);
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});
