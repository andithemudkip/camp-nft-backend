require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();
const port = process.env.PORT || 80;

app.set('trust proxy', 2);
app.use(morgan('dev'));
app.use(helmet());
if (process.env.ENABLE_CORS === 'true') {
    const cors = require('cors');
    app.use(cors());
}
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(express.raw({ type: "application/octet-stream", limit: "50mb" }));

const getRoutes = require('./routes/index');

app.use('/', getRoutes());

app.use(function(err, req, res, next) {
    console.log('app.use ERR=', err.stack);
    res.status(500).send('Oopsie!');
});

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

server.keepAliveTimeout = 77000;
server.headersTimeout = 78000;