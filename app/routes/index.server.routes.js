/*
***
index.server.routes.js
***

the routing module function accepts app as argument, SO when you
call this function you need to pass the instance of the Express application 

***
*/


module.exports = function(app) {
    var index = require('../controllers/index.server.controller');
    app.get('/', index.render);
}
