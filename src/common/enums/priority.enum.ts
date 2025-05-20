export const PriorityEnum = {
  CRITICAL: 'CRITICAL',
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW',
} as const

export type PriorityEnum = (typeof PriorityEnum)[keyof typeof PriorityEnum]
