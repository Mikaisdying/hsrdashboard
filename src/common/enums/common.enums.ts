export const StatusEnum = {
  NEW: 'NEW',
  ONGOING: 'ONGOING',
  ARCHIVED: 'ARCHIVED',
  CLOSED: 'CLOSED',
  WIP: 'IN PROGRESSING',
} as const

export type StatusEnum = (typeof StatusEnum)[keyof typeof StatusEnum]
