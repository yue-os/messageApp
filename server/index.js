const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const port = 3000;
const dotenv = require('dotenv');	
const Message = require("./models/Message")
const mongoose = require('mongoose');
const dns = require('node:dns')

dotenv.config();
dns.setServers(['8.8.8.8','1.1.1.1'])

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
	origin: '*',
	methods: ['GET', 'POST', 'OPTIONS'],
  },
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

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