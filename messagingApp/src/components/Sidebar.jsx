import chats from '../data/chats'

function Sidebar({ isDark }) {
	return (
		<div className={`w-80 border-r ${isDark ? 'border-slate-700 bg-slate-900' : 'border-gray-200 bg-gray-50'}`}>
			<h2
				className={`border-b p-4 text-xl font-semibold ${
					isDark ? 'border-slate-700 text-slate-100' : 'border-gray-200 text-gray-800'
				}`}
			>
				Messages
			</h2>

			<div className="overflow-y-auto">
				{chats.map((chat) => (
					<div
						key={chat.id}
						className={`flex cursor-pointer items-center border-b p-4 ${
							isDark
								? 'border-slate-800 hover:bg-slate-800'
								: 'border-gray-100 hover:bg-gray-100'
						}`}
					>
						<div className="relative mr-3">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-lg font-semibold text-white">
								{chat.name.charAt(0)}
							</div>
							{chat.online && (
								<span
									className={`absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 bg-green-500 ${
										isDark ? 'border-slate-900' : 'border-white'
									}`}
								/>
							)}
						</div>

						<div className="flex flex-col items-start">
							<h3 className={`text-sm font-semibold ${isDark ? 'text-slate-100' : 'text-gray-800'}`}>{chat.name}</h3>
							<p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{chat.message}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Sidebar
