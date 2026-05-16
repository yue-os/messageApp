/* eslint-disable react-hooks/refs */
/* eslint-disable react-hooks/purity */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from'react'
import Sidebar from './components/Sidebar'
import ChatHeader from './components/ChatHeader'
import MessageBubble from './components/MessageBubble'
import MessageInput from './components/MessageInput'
import { io } from 'socket.io-client'

const socket = io('http://127.0.0.1:3000')

function App() {
  const params = new URLSearchParams(window.location.search)
  const username = params.get('username')?.trim() || "Anonymous"
  const [messages, setMessages] = useState([])
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'light')
  const bottomRef = useRef(null)
  const myId = useRef(Math.random().toString(36).substr(2, 9))
  

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/messages')
        const data = await response.json()
        const formattedMessages = data.map((msg) => ({
          ...msg,
          text: msg.content,
          sender: String(msg.senderName) === String(username) ? 'me' : 'other'
        }))
        setMessages(formattedMessages.reverse())
      } catch (err) {
        console.error('Failed to load messages:', err)
      }
    }
    loadMessages()
  }, [])

  useEffect(() => {
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => {
        const isAlreadyPresent = prevMessages.some((msg) => 
          (msg._id === message._id) || 
          (msg.sender === 'me' && msg.content === message.content && Math.abs(new Date(msg.createdAt || Date.now()) - new Date(message.createdAt)) < 5000)
        )
        
        if (isAlreadyPresent) return prevMessages

        const isMe = String(message.senderName) === String(username)
        const formattedMessage = {
          ...message,
          text: message.content,
          sender: isMe ? 'me' : 'other'
        }
        return [...prevMessages, formattedMessage]
      })
    })

    return () => {
      socket.off('receive_message')
    }
  }, [])

  const handleOptimisticSend = (msg) => {
    setMessages((prev) => [...prev, msg])
  }
  
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
          <ChatHeader username={username} isDark={isDark} onToggleTheme={() => setIsDark((prev) => !prev)} />

          <div
            className={`flex flex-1 flex-col space-y-4 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden p-4 sm:p-6 ${
              isDark ? 'bg-slate-800' : 'bg-gray-100'
            }`}
          >
            {messages.map((message) => (
              <div key={message.id || message._id} className="message-in">
                <MessageBubble text={message.text} sender={message.sender} time={message.time} isDark={isDark} />
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <MessageInput username={username} socket={socket} myId={myId.current} isDark={isDark} onSend={handleOptimisticSend} />
        </main>
      </div>
    </div>
  )
}

export default App