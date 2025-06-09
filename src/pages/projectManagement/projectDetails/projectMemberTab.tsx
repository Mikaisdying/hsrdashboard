import React, { useState } from 'react'
import {
  Typography,
  Avatar,
  List,
  Tag,
  Space,
  Descriptions,
  Button,
  Modal,
  Input,
  DatePicker,
} from 'antd'
import { LinkOutlined, TeamOutlined, UserOutlined, EditOutlined } from '@ant-design/icons'
import type { IProject } from '../../../apis/projects/project.interface'
import { updateProjectFieldsApi } from '../../../apis/projects/project.api'
import dayjs from 'dayjs'

const { Title } = Typography

interface ProjectMemberTabProps {
  project: IProject
  fetchDetail?: () => void
}

const ProjectMemberTab: React.FC<ProjectMemberTabProps> = ({ project, fetchDetail }) => {
  const [editCodeModalOpen, setEditCodeModalOpen] = useState(false)
  const [codeValue, setCodeValue] = useState(project.code)
  const [codeLoading, setCodeLoading] = useState(false)

  const [editTimeModalOpen, setEditTimeModalOpen] = useState(false)
  const [timeValue, setTimeValue] = useState([
    project.createdDate ? dayjs(project.createdDate) : null,
    project.endDate ? dayjs(project.endDate) : null,
  ])
  const [timeLoading, setTimeLoading] = useState(false)

  const [editBudgetModalOpen, setEditBudgetModalOpen] = useState(false)
  const [budgetValue, setBudgetValue] = useState(project.budget)
  const [budgetLoading, setBudgetLoading] = useState(false)

  const [editLinksModalOpen, setEditLinksModalOpen] = useState(false)
  const [linksValue, setLinksValue] = useState(project.link?.join('\n') || '')
  const [linksLoading, setLinksLoading] = useState(false)

  const handleOpenEditCode = () => {
    setCodeValue(project.code)
    setEditCodeModalOpen(true)
  }

  const handleSaveCode = async () => {
    setCodeLoading(true)
    try {
      await updateProjectFieldsApi(project.id, { code: codeValue })
      setEditCodeModalOpen(false)
      if (fetchDetail) fetchDetail()
      else window.location.reload()
    } finally {
      setCodeLoading(false)
    }
  }

  const handleOpenEditTime = () => {
    setTimeValue([
      project.createdDate ? dayjs(project.createdDate) : null,
      project.endDate ? dayjs(project.endDate) : null,
    ])
    setEditTimeModalOpen(true)
  }
  const handleSaveTime = async () => {
    setTimeLoading(true)
    try {
      const [start, end] = timeValue
      await updateProjectFieldsApi(project.id, {
        createdDate: start ? start.format('YYYY-MM-DD') : '',
        endDate: end ? end.format('YYYY-MM-DD') : '',
      })
      setEditTimeModalOpen(false)
      if (fetchDetail) fetchDetail()
      else window.location.reload()
    } finally {
      setTimeLoading(false)
    }
  }

  const handleOpenEditBudget = () => {
    setBudgetValue(project.budget)
    setEditBudgetModalOpen(true)
  }
  const handleSaveBudget = async () => {
    setBudgetLoading(true)
    try {
      await updateProjectFieldsApi(project.id, { budget: Number(budgetValue) })
      setEditBudgetModalOpen(false)
      if (fetchDetail) fetchDetail()
      else window.location.reload()
    } finally {
      setBudgetLoading(false)
    }
  }

  const handleOpenEditLinks = () => {
    setLinksValue((project.link || []).join('\n'))
    setEditLinksModalOpen(true)
  }
  const handleSaveLinks = async () => {
    setLinksLoading(true)
    try {
      await updateProjectFieldsApi(project.id, {
        link: linksValue
          .split(/\r?\n/)
          .map((l) => l.trim())
          .filter(Boolean),
      })
      setEditLinksModalOpen(false)
      if (fetchDetail) fetchDetail()
      else window.location.reload()
    } finally {
      setLinksLoading(false)
    }
  }

  return (
    <div style={{ marginTop: 32, marginBottom: 0 }}>
      <Title level={5}>
        <TeamOutlined /> Thành viên
      </Title>
      {project.members && project.members.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={project.members}
          renderItem={(member) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={member.avatar} />}
                title={member.name}
                description={
                  <Space>
                    {member.email && (
                      <Typography.Paragraph type="secondary">{member.email}</Typography.Paragraph>
                    )}
                    {member.role && <Tag>{member.role}</Tag>}
                    {member.job && <Tag color="blue">{member.job}</Tag>}
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      ) : (
        <Typography.Paragraph type="secondary">Chưa có thành viên</Typography.Paragraph>
      )}
      <Descriptions
        title="Thông tin dự án"
        column={1}
        size="small"
        bordered
        style={{ marginBottom: 16 }}
      >
        <Descriptions.Item label="Mã dự án">
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {project.code}
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              style={{ marginLeft: 8 }}
              onClick={handleOpenEditCode}
            />
          </span>
        </Descriptions.Item>
        <Descriptions.Item label="Thời gian">
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {project.createdDate && project.endDate
              ? `${dayjs(project.createdDate).format('DD/MM/YYYY')} - ${dayjs(project.endDate).format('DD/MM/YYYY')}`
              : ''}
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              style={{ marginLeft: 8 }}
              onClick={handleOpenEditTime}
            />
          </span>
        </Descriptions.Item>
        <Descriptions.Item label="Ngân sách">
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {project.budget?.toLocaleString()} VND
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              style={{ marginLeft: 8 }}
              onClick={handleOpenEditBudget}
            />
          </span>
        </Descriptions.Item>
        <Descriptions.Item label="Liên kết">
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {project.link && project.link.length > 0 && project.link.some((l) => l) ? (
              <Space direction="vertical">
                {project.link.filter(Boolean).map((l, idx) => (
                  <a key={idx} href={l} target="_blank" rel="noopener noreferrer">
                    <LinkOutlined /> {l}
                  </a>
                ))}
              </Space>
            ) : (
              <Typography.Paragraph type="secondary">Không có</Typography.Paragraph>
            )}
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              style={{ marginLeft: 8 }}
              onClick={handleOpenEditLinks}
            />
          </span>
        </Descriptions.Item>
      </Descriptions>
      <div style={{ marginBottom: 24 }}>
        <Title level={5}>
          <UserOutlined /> Quản lý dự án
        </Title>
        <Space>
          <Avatar src={project.pm?.avatar} />
          <span>{project.pm?.name}</span>
          <Typography.Paragraph type="secondary">{project.pm?.email}</Typography.Paragraph>
        </Space>
      </div>
      <Modal
        open={editCodeModalOpen}
        title="Sửa mã dự án"
        onCancel={() => setEditCodeModalOpen(false)}
        onOk={handleSaveCode}
        confirmLoading={codeLoading}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Input
          value={codeValue}
          onChange={(e) => setCodeValue(e.target.value)}
          placeholder="Nhập mã dự án mới"
        />
      </Modal>
      <Modal
        open={editTimeModalOpen}
        title="Sửa thời gian dự án"
        onCancel={() => setEditTimeModalOpen(false)}
        onOk={handleSaveTime}
        confirmLoading={timeLoading}
        okText="Lưu"
        cancelText="Hủy"
      >
        <DatePicker.RangePicker
          value={timeValue as [any, any]}
          onChange={(val) => setTimeValue(val ? (val as [any, any]) : [null, null])}
          format="DD/MM/YYYY"
          style={{ width: '100%' }}
          allowEmpty={[false, false]}
        />
      </Modal>
      <Modal
        open={editBudgetModalOpen}
        title="Sửa ngân sách"
        onCancel={() => setEditBudgetModalOpen(false)}
        onOk={handleSaveBudget}
        confirmLoading={budgetLoading}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Input
          value={budgetValue}
          onChange={(e) => setBudgetValue(Number(e.target.value))}
          type="number"
          min={0}
          step={1000}
          placeholder="Nhập ngân sách mới"
          style={{ width: '100%' }}
        />
      </Modal>
      <Modal
        open={editLinksModalOpen}
        title="Sửa liên kết dự án"
        onCancel={() => setEditLinksModalOpen(false)}
        onOk={handleSaveLinks}
        confirmLoading={linksLoading}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Input.TextArea
          rows={4}
          value={linksValue}
          onChange={(e) => setLinksValue(e.target.value)}
          placeholder="Mỗi liên kết 1 dòng"
        />
      </Modal>
    </div>
  )
}

export default ProjectMemberTab
