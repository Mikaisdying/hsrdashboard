import React, { useState } from 'react'
import { Avatar, Button, Input } from 'antd'
import { ArrowLeftOutlined, PaperClipOutlined, SendOutlined } from '@ant-design/icons'
import { useTheme } from '../theme/ThemeContext'

interface ChatContainerProps {
  contact: { name: string; img: string }
  onBack: () => void
}

const ChatContainer: React.FC<ChatContainerProps> = ({ contact, onBack }) => {
  const { theme } = useTheme()
  const [messages] = useState([
    { type: 'received', text: 'Hello! How can I help you?', time: 'Today at 12:40' },
    { type: 'sent', text: 'Hi! I have a question.', time: 'Today at 12:41' },
    { type: 'received', text: 'Sure, go ahead!', time: 'Today at 12:42' },
    { type: 'sent', text: 'How do I use this dashboard?', time: 'Today at 12:43' },
  ])
  const [input, setInput] = useState('')

  return (
    <div className="bg-secondary relative flex h-full w-full flex-col overflow-hidden rounded-xl">
      {/* TopBar */}
      <div className="border-border bg-secondary sticky top-0 z-20 flex h-16 items-center gap-3 border-b px-4">
        <ArrowLeftOutlined
          style={{ fontSize: 20, marginRight: 8, cursor: 'pointer' }}
          className="text-icon"
          onClick={onBack}
        />
        <Avatar src={contact.img} size={46} />
        <div className="ml-2 flex flex-col">
          <span className="text-text text-base font-semibold">{contact.name}</span>
          <span className="text-text text-xs">Online</span>
        </div>
      </div>
      {/* Chat - scrollable */}
      <div
        className={`flex-1 overflow-y-auto p-4 ${theme === 'dark' ? 'bg-[#181a20]' : 'bg-[#f7f7f7]'} `}
      >
        {messages.map((msg, idx) =>
          msg.type === 'received' ? (
            <div key={idx} className="mt-4 flex flex-col items-start">
              <div
                className={` ${theme === 'dark' ? 'text-text bg-[#23272f]' : 'text-text bg-[#e6e6e6]'} max-w-[70%] rounded-xl px-4 py-3 text-sm shadow`}
              >
                {msg.text}
              </div>
              <span className="ml-2 text-xs text-[#aaa]">{msg.time}</span>
            </div>
          ) : (
            <div key={idx} className="mt-4 flex flex-col items-end">
              <div
                className={` ${
                  theme === 'dark' ? 'bg-[#7265e6] text-white' : 'bg-blue-100 text-[#23272f]'
                } max-w-[70%] rounded-[12px_0_12px_12px] px-4 py-3 text-sm shadow`}
              >
                {msg.text}
              </div>
              <span className="mr-2 text-xs text-[#aaa]">{msg.time}</span>
            </div>
          )
        )}
      </div>
      {/* Footer fixed */}
      <div className="border-border bg-secondary sticky bottom-0 z-20 flex h-16 items-center gap-2 border-t px-4">
        <Button type="text" icon={<PaperClipOutlined className="text-icon text-xl" />} />
        <Input
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={`text-text mr-2 flex-1 rounded-xl border-none bg-[#f5f5f5] dark:bg-[#23272f]`}
        />
        <Button type="text" icon={<SendOutlined className="text-icon text-[22px]" />} />
      </div>
    </div>
  )
}

export default ChatContainer
