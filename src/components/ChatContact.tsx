import React from 'react'
import { Avatar, Input } from 'antd'
import { UserOutlined, SearchOutlined } from '@ant-design/icons'

const contacts = [
  {
    name: 'John Doe',
    img: 'https://i.pravatar.cc/150?img=3',
    lastMsg: 'Test message this is',
    time: '12:21 PM',
  },
  {
    name: 'Jane Smith',
    img: 'https://i.pravatar.cc/150?img=4',
    lastMsg: 'Hello there!',
    time: '11:10 AM',
  },
  {
    name: 'Alice',
    img: 'https://i.pravatar.cc/150?img=5',
    lastMsg: 'How are you?',
    time: '10:05 AM',
  },
  {
    name: 'Bob',
    img: 'https://i.pravatar.cc/150?img=6',
    lastMsg: 'See you soon!',
    time: '09:45 AM',
  },
]

interface ChatContactProps {
  onSelectContact: (contact: { name: string; img: string }) => void
}

const ChatContact: React.FC<ChatContactProps> = ({ onSelectContact }) => {
  return (
    <div className="bg-background flex h-full w-full flex-col overflow-hidden rounded-xl">
      {/* TopBar */}
      <div className="border-border bg-background sticky bottom-0 z-20 flex h-16 items-center gap-3 border-b px-4">
        <Avatar src="https://i.pravatar.cc/150?img=3" size={46} />
        <div className="ml-2 flex flex-col">
          <span className="text-text text-base font-semibold">
            <b>Messaging</b>
          </span>
        </div>
      </div>
      {/* SearchBar */}
      <div className="border-border bg-background text-icon sticky bottom-0 z-20 flex h-14 items-center border-b px-4">
        <SearchOutlined className="text-icon text-xl" />
        <Input
          placeholder="Search messages"
          className={`chat-search-input text-text ml-4 flex-1 border-none bg-transparent text-base outline-none`}
        />
      </div>
      {/* Contacts */}
      <div className="bg-secondary h-[480px] overflow-y-scroll rounded-bl-lg">
        {contacts.map((c) => (
          <div
            key={c.name}
            className="border-border bg-secondary hover:bg-contentBg flex cursor-pointer items-center border-b px-3 py-[14px] transition-colors duration-200"
            onClick={() => onSelectContact({ name: c.name, img: c.img })}
            tabIndex={0}
          >
            <Avatar src={c.img} size={46} icon={<UserOutlined />} />
            <div className="ml-4 flex flex-col gap-1">
              <span className="text-text text-base font-medium">{c.name}</span>
              <span className={`text-sm'}`}>{c.lastMsg}</span>
            </div>
            <span className={`ml-auto text-xs`}>{c.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatContact
