const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const port = 3000;
const dotenv = require('dotenv');	
const Message = require("./models/Message")
const mongoose = require('mongoose');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
	origin: '*',
	methods: ['GET', 'POST'],
  },
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.get('/messages', async (req, res) => {
	try {
		const messages = await Message.find().sort({ createdAt: -1 });
		res.json(messages);
	} catch (err) {
		res.status(500).json({ error: 'Failed to fetch messages' });
	}
});

io.on('connection', (socket) => {
  console.log('a user connected '  + socket.id);

  socket.on('send_message', async (msg) => {
	try {
		const savedMessage = await Message.create({
			content: msg.content,
			senderId: msg.senderId,
			senderName: msg.senderName || "Anonymous",
			time: msg.time
		});
		const messageData = savedMessage.toObject();
		io.emit('receive_message', messageData);
	} catch (err) {
		console.error('Error saving message:', err);
		socket.emit('message_error', { error: 'Failed to save message', details: err.message });
	}
  });


  socket.on('disconnect', () => {
	console.log('user disconnected');
  });
});

	server.listen(port, () => {
	console.log('listening on port:' + port);
	});