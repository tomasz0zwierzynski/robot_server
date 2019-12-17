//server.js
const config = require('./config.json');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let socketPi;
io.use( function(socket, next) {
	if (socket.handshake.query && socket.handshake.query.token) {
		if ( socket.handshake.query.token === 'secret' ) {
			next();
		}
	} else {
		next( new Error('Auth error') );
	}
} ).on('connection', function (socket){
  	if ( socket.handshake.query.id === 'pi' ) {
		console.log('PI connected!');
		socketPi = socket;
	} 
  
  	socket.on(config.robotChannel, function (from, msg) {
    	console.log('Message: ', from, ' is saying "', msg, '"');
  	});
});

app.get( '/', function (req, res) { 
	res.send( 'testEndpoint' );
} );

app.post( '/send', function ( req, res ) {
	console.log(req);
	console.log(req.body);
	if (socketPi) {
		socketPi.emit(config.robotChannel, req.body);
	}
	res.send('OK');
} );	

http.listen(3000, function () {
  console.log('listening on *:3000');
});