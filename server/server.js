const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const url = require('url');
require('dotenv').config();

const app = express();

const { json, urlencoded } = bodyParser;
app.use(express.static('public'));

app.use(morgan('tiny'));
app.use(json());
app.use(urlencoded({ extended: false }));


app.all('/api/data/*', (req, res) => {
  console.log('hellooooo');
  axios({
    method: 'GET',
    url: url.resolve(process.env.ONLINE_DATA_PATH, req.params[0]),
  })
    .then((rest) => {
      console.log(rest);
      res.send(rest.data);
    });
});

app.get('/api/data/', (req, res) => {
  const urlPath = url.resolve(process.env.ONLINE_DATA_PATH, 'prod/v1/today.json');

  axios({
    method: 'GET',
    url: urlPath,
  })
    .then((result) => {
      const { links } = result.data;
      res.send(links);
    });
});


app.listen(process.env.SERVICE_PORT || 4444, () => {
  console.log(`connected to ${process.env.SERVICE_PORT}`);
});
