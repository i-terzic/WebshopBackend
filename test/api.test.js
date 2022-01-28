const api = require('../src/api');

test('App listens', async () => {
  const app = api();
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`listening on port: http://localhost:${port}`);
  });
  
});
