//server.js
const config = require('./config.json');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// SOCKET.IO

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


// HTTP ENDPOINTS

app.get( '/', function (req, res) { 
	res.send( 'testEndpoint' );
} );

// TEST CHANNEL

app.post( '/send', function ( req, res ) {
	console.log(req);
	console.log(req.body);
	if (socketPi) {
		socketPi.emit(config.robotChannel, req.body);
	}
	res.send('OK');
} );	


// JWT TOKENS
const jwt = require('jsonwebtoken');
const db = require('./services/db');

db.createUser( { username: 'tomcio', password: '1234', roles: ['OBSERVER', 'NOT_LOGGED'] } );
db.createUser( { username: 'admin', password: 'admin', roles: ['OBSERVER', 'NOT_LOGGED', 'ADMIN'] } );

app.post( '/login', function ( req, res ) {
	const username = req.body.user;
	const password = req.body.pass;

	const user = db.findUserByUsername( username );

	if ( user ) {
		if ( password === user.password ) { // jeśli login i hasło są dobre
	
			const token = jwt.sign({
				data: username
			}, 'secret', { expiresIn: '1h' });				
	
			res.json( { token: token } );
		}
	}

	res.status(405);
} );


app.get( '/resource', function (req, res) {
	const token = req.headers.token;
	
	var decoded = jwt.verify(token, 'secret' );
	console.log( decoded );
	
	
	res.json( { a: 1 } );
} );

// START SERVER

http.listen(3000, function () {
  console.log('listening on *:3000');
});