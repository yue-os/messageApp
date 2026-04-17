function MessageBubble({ text, sender, isDark }) {
	return (
		<div className={`flex ${sender === 'me' ? 'justify-end' : 'justify-start'}`}>
			<div
				className={`max-w-xs rounded-2xl px-4 py-2 shadow-sm ${
					sender === 'me'
						? 'bg-blue-500 text-white'
						: isDark
							? 'bg-slate-700 text-slate-100'
							: 'bg-white text-gray-800'
				}`}
			>
				{text}
			</div>
		</div>
	)
}

export default MessageBubble
