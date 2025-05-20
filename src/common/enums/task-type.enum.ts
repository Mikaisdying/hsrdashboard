export const TaskTypeEnum = {
  BUG: 'BUG',
  FEATURE: 'FEATURE',
  IMPROVE: 'IMPROVE',
} as const

export type TaskTypeEnum = (typeof TaskTypeEnum)[keyof typeof TaskTypeEnum]
