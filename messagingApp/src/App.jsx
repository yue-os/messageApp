import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import ChatHeader from './components/ChatHeader'
import MessageBubble from './components/MessageBubble'
import MessageInput from './components/MessageInput'

const initialMessages = [
  {
    id: 1,
    text: 'Hello!',
    sender: 'other',
  },
  {
    id: 2,
    text: 'Hi! How are you?',
    sender: 'me',
  },
  {
    id: 3,
    text: 'I am doing well.',
    sender: 'other',
  },
]

function App() {
  const [messages, setMessages] = useState(initialMessages)
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <div className={`min-h-screen p-4 ${isDark ? 'bg-slate-950' : 'bg-gray-100'}`}>
      <div
        className={`mx-auto flex h-[90vh] max-w-6xl overflow-hidden rounded-2xl shadow-lg ${
          isDark ? 'bg-slate-900' : 'bg-white'
        }`}
      >
        <Sidebar isDark={isDark} />

        <div className="flex flex-1 flex-col">
          <ChatHeader isDark={isDark} onToggleTheme={() => setIsDark((prev) => !prev)} />

          <div
            className={`flex flex-1 flex-col space-y-3 overflow-y-auto p-4 ${
              isDark ? 'bg-slate-800' : 'bg-gray-100'
            }`}
          >
            {messages.map((message) => (
              <MessageBubble key={message.id} text={message.text} sender={message.sender} isDark={isDark} />
            ))}
          </div>

          <MessageInput setMessages={setMessages} isDark={isDark} />
        </div>
      </div>
    </div>
  )
}

export default App