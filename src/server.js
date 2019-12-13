//server.js
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let socketPi;
io.on('connection', function (socket){
  console.log(socket);

	socketPi = socket;
  
  socket.on('CH01', function (from, msg) {
    console.log('MSG', from, ' saying ', msg);
  });

});

app.get( '/', function (req, res) { 
	res.send( 'testEndpoint' );
} );

app.post( '/send', function ( req, res ) {
	console.log(req);
	console.log(req.body);
	if (socketPi) {
		socketPi.emit('CH02', req.body);
	}
	res.send('OK');
} );	

http.listen(3000, function () {
  console.log('listening on *:3000');
});