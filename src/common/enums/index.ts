// TaskTypeEnum
export const TaskTypeEnum = {
  BUG: 'BUG',
  FEATURE: 'FEATURE',
  IMPROVE: 'IMPROVE',
} as const
export type TaskTypeEnum = (typeof TaskTypeEnum)[keyof typeof TaskTypeEnum]

// StatusEnum
export const StatusEnum = {
  NEW: 'NEW',
  ONGOING: 'ONGOING',
  ARCHIVED: 'ARCHIVED',
  CLOSED: 'CLOSED',
  WIP: 'IN PROGRESSING',
} as const
export type StatusEnum = (typeof StatusEnum)[keyof typeof StatusEnum]

// PriorityEnum
export const PriorityEnum = {
  CRITICAL: 'CRITICAL',
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW',
} as const
export type PriorityEnum = (typeof PriorityEnum)[keyof typeof PriorityEnum]

// RoleEnum
export const RoleEnum = {
  TEAM_LEADER: 'TEAM_LEADER',
  MEMBER: 'MEMBER',
  PM: 'PM',
  SA: 'SA',
  DE: 'DE',
  QC: 'QC',
} as const
export type RoleEnum = (typeof RoleEnum)[keyof typeof RoleEnum]
