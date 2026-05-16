import { useState } from 'react'

function MessageInput({ socket, myId, isDark, onSend, username }) {
	const [input, setInput] = useState('')

	const handleSend = () => {
		if (!input.trim()) {
			return
		}

		const newMessage = {
			content: input,
			senderId: myId,
			senderName: username || "Anonymous",
			time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
		}

		if (onSend) {
			onSend({ ...newMessage, id: Date.now(), sender: 'me', text: newMessage.content })
		}

		socket.emit('send_message', newMessage)
		setInput('')
	}

	return (
		<footer className={`border-t p-4 ${isDark ? 'border-slate-700 bg-slate-900' : 'border-gray-200 bg-white'}`}>
			<div className="flex gap-2">
				<input
					type="text"
					placeholder="Type a message..."
					aria-label="Message input"
					className={`flex-1 rounded-full border px-4 py-2 outline-none focus:border-blue-500 ${
						isDark
							? 'border-slate-600 bg-slate-800 text-slate-100 placeholder:text-slate-400'
							: 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-400'
					}`}
					value={input}
					onChange={(event) => setInput(event.target.value)}
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							handleSend()
						} 
					}}
				/>

				<button
					type="button"
					onClick={handleSend}
					className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
					Send
				</button>
			</div>
		</footer>
	)
}

export default MessageInput
