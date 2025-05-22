import React from 'react'
import { Switch } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from './ThemeContext'

const iconStyle = { fontSize: 16 }
const switchBaseStyle = (theme: string) => ({
  marginRight: 20,
  background: theme === 'dark' ? '#0a0630' : '#e6f7f7',
  border: 'none',
  minWidth: 50,
  height: 30,
  display: 'flex',
  alignItems: 'center',
  borderRadius: 999,
  boxShadow: theme === 'dark' ? '0 0 4px #222' : '0 0 4px #b2f0f0',
  transition: 'background 0.3s',
})

const iconSpan = (icon: any, align: 'flex-start' | 'flex-end', color: string) => (
  <span
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: align,
      width: 22,
      transform: 'translateY(50%)',
    }}
  >
    <FontAwesomeIcon
      icon={icon}
      style={{ ...iconStyle, color, display: 'block', margin: '0 auto' }}
    />
  </span>
)

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()
  return (
    <Switch
      checked={theme === 'dark'}
      checkedChildren={iconSpan(faMoon, 'flex-end', '#faad04')}
      unCheckedChildren={iconSpan(faSun, 'flex-start', '#ffcd57')}
      onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
      style={{
        ...switchBaseStyle(theme),
        display: 'flex',
        alignItems: 'center',
        verticalAlign: 'middle',
      }}
    />
  )
}

export default ThemeToggle
