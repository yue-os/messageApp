/* eslint-disable no-unused-vars */
import chats from '../data/chats'
import { useState } from 'react'

function Sidebar({ isDark }) {
	const [search, setSearch] = useState('')
	const filteredChats = chats.filter((chat) => chat.name.toLowerCase().includes(search.toLowerCase()))
	
	return (
		<aside className={`flex w-80 flex-col border-r ${isDark ? 'border-slate-700 bg-slate-900' : 'border-gray-200 bg-gray-50'}`}>
			<div className={`border-b p-4 ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
				<h2
					className={`text-xl font-semibold ${
						isDark ? 'text-slate-100' : 'text-gray-800'
					}`}
				>
					Messages
				</h2>
				<input 
					type="text"
					placeholder="Search contacts..."
					aria-label="Search contacts"
					value={search}
					onChange={(event) => setSearch(event.target.value)}
					className={`mt-4 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500 ${
						isDark
							? 'border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-400'
							: 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-400'
					}`} 
				/>
			</div>

			<div className="flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
				{filteredChats.map((chat) => (
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
		</aside>
	)
}

export default Sidebar
