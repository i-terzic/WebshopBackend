const api = require('./app');

const port = process.env.PORT || 5000;

api.listen(port, () => {
  console.log(`Listening at: http://localhost:${port} `);
});
