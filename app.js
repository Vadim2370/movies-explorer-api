require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const limiter = require('./utils/limiter');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleError = require('./utils/handleError');
const router = require('./routes/index');
const { PORT_DEV, DB_URL_DEV } = require('./utils/config');

const { PORT = PORT_DEV, DB_URL = DB_URL_DEV } = process.env;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(helmet());
app.use(limiter);

mongoose.connect(DB_URL);

app.use(cors);

app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(handleError);
app.listen(PORT);
console.log(`port ${PORT}`);
