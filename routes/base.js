var path   = require('path');
var nconf  = require('nconf');
var routes = [];

routes.push({
  meta: {
    method: 'GET',
    path: '/'
  },
  route: function (req,res) {
    res.render('index.ejs');
  }
},

{
  meta: {
    method: 'GET',
    path: '/sockethub-client.js'
  },
  route: function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../lib/client.js'));
  }
},

{
  meta: {
    method: 'GET',
    path: '/activity-streams.js'
  },
  route: function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../node_modules/activity-streams/browser/activity-streams.min.js'));
  }
});

if (nconf.get('dev')) {
  routes.push({
    meta: {
      method: 'GET',
      path: '/jquery.js'
    },
    route: function (req, res) {
      res.sendFile(path.resolve(__dirname + '/../node_modules/jquery/dist/jquery.min.js'));
    }
  },

  {
    meta: {
      method: 'GET',
      path: '/jquery.min.map'
    },
    route: function (req, res) {
      res.sendFile(path.resolve(__dirname + '/../node_modules/jquery/dist/jquery.min.map'));
    }
  });
}

/**
 * Setup
 */

exports.setup = function (app) {
  routes.forEach(function (route) {
    app[route.meta.method.toLowerCase()](
      route.meta.path,
      route.route
    );
  });
};
