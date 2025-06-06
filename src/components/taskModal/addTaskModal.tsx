import { createTaskApi } from '../../apis/tasks/task.api'
import type { IProject } from '../../apis/projects/project.interface'

export const handleAddTask = async (
  values: any,
  project: IProject,
  setTaskLoading: (loading: boolean) => void,
  setShowAddTask: (show: boolean) => void,
  fetchDetail: () => void
) => {
  if (!project) return
  setTaskLoading(true)
  try {
    const payload = {
      name: values.name?.trim(),
      description: values.description?.trim() || '',
      deadline: values.deadline || null,
      assigneeIds: Array.isArray(values.assignees)
        ? values.assignees
        : Array.isArray(values.assigneeIds)
          ? values.assigneeIds
          : [],
      projectId: project.id,
      workId: values.workId,
      priority: values.priority || null,
      type: values.type || null,
      tech_area: values.tech_area || null,
      confirm_required:
        typeof values.confirm_required === 'boolean' ? values.confirm_required : null,
      effort: values.effort || null,
      status: 'NEW',
      createdDate: new Date().toISOString(),
    }
    const task = await createTaskApi(payload)
    setTaskLoading(false)
    setShowAddTask(false)
    fetchDetail()
    return task
  } catch (e) {
    setTaskLoading(false)
    throw e
  }
}
