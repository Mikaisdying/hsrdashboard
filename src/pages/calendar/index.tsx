import { Calendar } from 'antd'
import dayjs from 'dayjs'

const NotificationPage = () => {
  return (
    <div
      style={{ overflow: 'auto', width: '90vw', height: '75vh', maxWidth: 1200, margin: '0 auto' }}
    >
      <Calendar fullscreen defaultValue={dayjs()} style={{ height: '100%' }} />
    </div>
  )
}

export default NotificationPage
