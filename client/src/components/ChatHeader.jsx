function ChatHeader({ isDark, onToggleTheme }) {
	return (
		<header
			className={`flex items-center justify-between border-b p-4 ${
				isDark ? 'border-slate-700 bg-slate-900' : 'border-gray-200 bg-white'
			}`}
		>
			<div className="flex flex-col items-start">
				<h2 className={`text-lg font-bold ${isDark ? 'text-slate-100' : 'text-gray-800'}`}>John Doe</h2>
				<p className="text-sm text-green-500">Online</p>
			</div>

			<button
				type="button"
				onClick={onToggleTheme}
				aria-label="Toggle theme"
				className={`rounded-full px-3 py-1.5 text-sm font-medium ${
					isDark
						? 'bg-slate-700 text-slate-100 hover:bg-slate-600'
						: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
				}`}
			>
				{isDark ? 'Light' : 'Dark'}
			</button>
		</header>
	)
}

export default ChatHeader
