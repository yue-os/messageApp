function MessageBubble({ text, sender, time, isDark }) {
	return (
		<div className={`flex flex-col ${sender === 'me' ? 'items-end' : 'items-start'}`}>
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
			<p className={`mt-1 text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
				{time}
			</p>
		</div>
	)
}

export default MessageBubble
