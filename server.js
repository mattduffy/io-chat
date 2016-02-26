'use strict';
const chatcat = require('./app')
  , express = require('express')
  , app = express()


console.log(chatcat.config);

let port = process.env.PORT || 3000;
app.set('port', port);
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(chatcat.session);
// register first of possibly many sub app routers
// this is mounted at root /
app.use('/', chatcat.router);
//app.use('/dashboard', dashboard.router);
//app.use('/api', api.router);

app.listen(port, ()=>{
  console.log("Chat cat listening on port ", port);
});
