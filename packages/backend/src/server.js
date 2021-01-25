require('dotenv/config');
const { errors } = require('celebrate');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');
const Utils = require('./utils/Utils');

const { MONGO_URL, PORT } = process.env;

mongoose.connect(MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const server = express();

server.use(cors({ exposedHeaders: Utils.totalItemsHeader }));
server.use(routes);
server.use(errors());
server.get('/', (_request, response) => response.send('Hello world!'));

server.listen(PORT, () => console.log(`🚀 Backend online in port ${PORT} 🚀`));
