import { PriorityEnum } from '../enums/priority.enum'
import { TaskTypeEnum } from '../enums/task-type.enum'

export const priorityTagColorMap: Record<PriorityEnum, string> = {
  CRITICAL: 'red-6',
  HIGH: 'volcano-6',
  MEDIUM: 'gold',
  LOW: 'green',
}

export const taskTypeTagColorMap: Record<TaskTypeEnum, string> = {
  BUG: 'red',
  FEATURE: 'blue',
  IMPROVE: 'cyan',
}
