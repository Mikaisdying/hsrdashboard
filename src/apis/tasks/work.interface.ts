import type { ITask } from './task.interface'

export interface IWork {
  id: string
  name: string
  tasks: ITask[]
}
