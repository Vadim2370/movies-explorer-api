const cors = require('cors');

const allowedCors = [
  'https://stdem11movie.nomoredomains.sbs',
  'http://stdem11movie.nomoredomains.sbs',
  'http://localhost:3000',
];

const corsOption = {
  origin: allowedCors,
  credentials: true,
  methods: 'GET, HEAD, PUT, POST, DELETE',
};

module.exports = cors(corsOption);
