import { Tag } from 'antd'
import { PriorityEnum } from '../common/enums/priority.enum'
import { TaskTypeEnum } from '../common/enums/task-type.enum'
import { priorityTagColorMap, taskTypeTagColorMap } from '../common/helpers/tagColor.helper'

type Props = {
  priority?: PriorityEnum
  type?: TaskTypeEnum
}

export const TaskTag = ({ priority, type }: Props) => {
  return (
    <>
      {priority && (
        <Tag color={priorityTagColorMap[priority]}>
          {priority.charAt(0) + priority.slice(1).toLowerCase()}
        </Tag>
      )}
      {type && (
        <Tag color={taskTypeTagColorMap[type]}>{type.charAt(0) + type.slice(1).toLowerCase()}</Tag>
      )}
    </>
  )
}
export default TaskTag
