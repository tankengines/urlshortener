const path = require('path')
const express = require('express');
const app = express();
const router = express.Router();

const Handler = require('./handler.js');
const handler = new Handler();

// JSON-ify body before anything is handled
app.use(express.json())

// add static directory into the server's file structure
app.use('/', express.static(path.join(__dirname, '/public/')));

// app.use(router) has to go AFTER the static directory;
// Express app middleware takes precedence in the order that they are called
app.use(router);

router.get('/', (_, res) => {
	res.sendFile(path.join(__dirname, '/public/index.html'));
})

router.post('/new', (req, res) => {
	handler.setURL(req, res);
});

// This needs to be put at the bottom to not override any previous routes (index, static files)
router.get('/:key', (req, res) => {
	handler.getURL(req, res);
});

router.use((_, res) => {
	res.status(404).sendFile(path.join(__dirname + '/public/404.html'));
});

app.listen(process.env.PORT ?? 4761, () => console.log(`Listening on port ${process.env.PORT ?? 4761}`));
