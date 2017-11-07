'use strict'
 
const Hapi = require('hapi');
const Request = require('request');
const Vision = require('vision');
const Handlebars = require('handlebars');
const LodashFilter = require('lodash.filter');
const LodashTake = require('lodash.take');
 
const server = new Hapi.Server();
 
server.connection({
  host: '127.0.0.1',
  port: 3000
});
 
// Register vision for our views
server.register(Vision, (err) => {
  server.views({
    engines: {
        html: Handlebars
    },
    relativeTo: __dirname,
    path: './views',
  });
});
 
server.start((err) => {
  if (err) {
    throw err;
  }

  console.log(`Server running at: ${server.info.uri}`);
});

// Default Home View
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.view('home');
    }
});

// Request in Weather API
server.route({
    method: 'GET',
    path: '/api/weather', //?zipcode=11111
    handler: function (request, reply) {
      var zipcode = request.query.zipcode;
      var api_key = '7d09b18f8b691c51ea06a84ddd73b233'
      var country = 'us';

      Request.get('http://api.openweathermap.org/data/2.5/weather?zip='+zipcode+','+country+'&APPID='+api_key, 
        function (error, response, body) {
        if (error) {
          throw error;
        }

        const data = JSON.parse(body);
        reply.view('weather', { 
          result: data, 
          no_result: response.statusCode == 200 ? false : true
        });
      });
    }
});
