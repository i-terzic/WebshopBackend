const api = require('./app');

const port = process.env.PORT || 5000;

api.listen(port, () => {
  /* eslint no-console: 0 */
  console.log(`Listening at: http://localhost:${port} `);
});
