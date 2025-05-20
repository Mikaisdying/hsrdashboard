export const RoleEnum = {
  TEAM_LEADER: 'TEAM_LEADER',
  MEMBER: 'MEMBER',
  PM: 'PM',
  SA: 'SA',
  DE: 'DE',
  QC: 'QC',
} as const

export type RoleEnum = (typeof RoleEnum)[keyof typeof RoleEnum]
