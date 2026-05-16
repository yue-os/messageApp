/* eslint-disable react-hooks/refs */
/* eslint-disable react-hooks/purity */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from'react'
import Sidebar from './components/Sidebar'
import ChatHeader from './components/ChatHeader'
import MessageBubble from './components/MessageBubble'
import MessageInput from './components/MessageInput'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')

const initialMessages = [
  {
    id: 1,
    text: 'Hello!',
    sender: 'other',
    time: "10:00 AM",
  },
  {
    id: 2,
    text: 'Hi! How are you?',
    sender: 'me',
    time: "10:05 AM",
  },
  {
    id: 3,
    text: 'I am doing well, how about you?',
    sender: 'other',
    time: "10:10 AM",
  },
]

function App() {
  const [messages, setMessages] = useState(initialMessages)
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'light')
  const bottomRef = useRef(null)
  const myId = useRef(Math.random().toString(36).substr(2, 9))
  console.log('My ID:', myId.current)
  

  useEffect(() => {
    socket.on('receive_message', (message) => {
      const formattedMessage = {
        ...message,
        sender: message.sender === myId.current ? 'me' : 'other'
      }
      setMessages((prevMessages) => [...prevMessages, formattedMessage])
    })
    return () => {socket.off('receive_message')}
  }, [])
  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth"})
  }, [messages])

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <div className={`flex min-h-screen items-center justify-center md:p-4 ${isDark ? 'bg-slate-950' : 'bg-gray-100'}`}>
      <div
        className={`flex h-[100dvh] w-full max-w-6xl overflow-hidden shadow-lg md:h-[90vh] md:rounded-2xl ${
          isDark ? 'bg-slate-900' : 'bg-white'
        }`}
      >
        <div className="hidden md:flex">
          <Sidebar isDark={isDark} />
        </div>

        <main className="flex flex-1 flex-col w-full">
          <ChatHeader isDark={isDark} onToggleTheme={() => setIsDark((prev) => !prev)} />

          <div
            className={`flex flex-1 flex-col space-y-4 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden p-4 sm:p-6 ${
              isDark ? 'bg-slate-800' : 'bg-gray-100'
            }`}
          >
            {messages.map((message) => (
              <div key={message.id} className="message-in">
                <MessageBubble text={message.text} sender={message.sender} time={message.time} isDark={isDark} />
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <MessageInput socket={socket} myId={myId.current} isDark={isDark} />
        </main>
      </div>
    </div>
  )
}

export default App