import { Card, Button, Progress } from 'antd'

const Dashboard = () => {
  return (
    <div>
      <div className="mb-6 flex justify-between">
        <Card title="Total Projects Done" className="w-[48%]" bordered={false}>
          <p>
            Working on <span className="text-blue-400">0</span> projects
          </p>
          <Progress percent={0} showInfo={false} strokeColor="#69c0ff" />
          <div className="text-right font-bold">0</div>
        </Card>

        <Card title="Total Task Done" className="w-[48%]" bordered={false}>
          <p>
            <span className="text-green-400">0</span> Tasks are left
          </p>
          <Progress percent={0} showInfo={false} strokeColor="#95de64" />
          <div className="text-right font-bold">0</div>
        </Card>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Recent Projects</h2>
        <div className="space-x-2">
          <Button type="primary" className="bg-purple-500">
            Create New Project
          </Button>
          <Button type="primary" className="border-none bg-yellow-400 text-black">
            Create New Team
          </Button>
        </div>
      </div>

      <Card className="w-full">
        <p className="text-white">f</p>
        <p className="text-white">f</p>
        <small className="text-gray-400">Updated 22 hours ago</small>
      </Card>
    </div>
  )
}

export default Dashboard
