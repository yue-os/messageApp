const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
	content: { type: String, required: true },
	senderId: { type: String, required: true },
	senderName: {type: String, required: true, default: "Anonymous"},
	time: { type: String, required: true },
	},
	{
		timestamps: true
	}
);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;