import express from 'express';
import http from 'http';
import io from 'socket.io';

const app = express();
const server = http.createServer(app);

const port = 3000;

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

io(http).on('connection', function(socket){
  console.log('a user connected');
});

server.listen(port, function() {
  return console.log(`server is listening on ${port}`);
});