const express = require('express');
const config = require('./config/environment');
// console.log(config);
const app = express();

require('./config/express.js')(app);

app.use('/api/', require('./router.js'));

require('./components/connect.js');
require('./models');

const port = config.PORT;
const server = app.listen(port, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Run http:${host}:${port}`);
  app.set('address', `http:${host}:${port}`);
  app.set('port', port);
  app.set('server', server);
});


module.exports = app;
