const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const port = 3000;

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
	origin: '*',
	methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('a user connected '  + socket.id);

  socket.on('send_message', (msg) => {
	console.log('message: ' + msg);
	io.emit('receive_message', msg);
  });


  socket.on('disconnect', () => {
	console.log('user disconnected');
  });
});

	server.listen(port, () => {
	console.log('listening on port:' + port);
	});