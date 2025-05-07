import { useEffect, useState } from 'react'
import { Table } from 'antd'

export default function ProjectList() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/projects')
      .then((res) => res.json())
      .then(setData)
  }, [])

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-semibold">Danh sách dự án</h1>
      <Table
        dataSource={data}
        rowKey="id"
        columns={[
          { title: 'ID', dataIndex: 'id' },
          { title: 'Tên dự án', dataIndex: 'name' },
          { title: 'Trạng thái', dataIndex: 'status' },
        ]}
      />
    </div>
  )
}
