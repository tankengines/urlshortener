const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const Handler = require('./src/handler');
const handler = new Handler();
const port = 4761;

const middlewares = [express.static(__dirname + '/public'), bodyParser.urlencoded({ extended: true })];
app.set('view engine', 'ejs');
app.use(middlewares);

router.get('/', (req, res) => {
	res.render('index');
});

router.get('/:key', (req, res) => {
	handler.getURL(req, res);
});

router.head('/:key', async (req, res) => {
	handler.getURL(req, res);
});

router.post('/new', async (req, res) => {
	handler.setURL(req, res);
});

router.use((_, res) => {
	res.status(404).render('404');
});

app.use(router);
app.listen(port, () => console.log(`Listening on port ${port}`));