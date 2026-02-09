import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteTask, updateTask } from '../redux/taskSlice'
import { stringTrimer } from '../common/stringFunc'

const TaskItem = ({ task, className = '', onDelete }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    title,
    description,
    dueDate,
    priority,
    status,
    _id,
    id,
  } = task || {}

  const taskId = _id || id
  const isCompleted = status === 'Completed'

  const handleEdit = () => {
    navigate(`/edit-task/${taskId}`)
  }


  // 🔁 Toggle status
  const handleStatusToggle = () => {
    const newStatus = isCompleted ? 'Pending' : 'Completed'

    dispatch(
      updateTask({
        taskId,
        taskData: { status: newStatus },
      })
    )
  }
  const handleDelete = () => {
  if (window.confirm('Are you sure you want to delete this task?')) {
    dispatch(deleteTask(taskId))
  }
}

  return (
    <div
      key={taskId}
      className={`grid grid-cols-1 md:grid-cols-7 gap-2 items-center p-3 border rounded ${className}`}
    >
      {/* Checkbox + Title */}
      <div className="md:col-span-2 flex items-center">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleStatusToggle}
          className="mr-2 cursor-pointer"
        />
        <span
          className={`font-semibold ${
            isCompleted ? 'line-through text-gray-400' : ''
          }`}
        >
          {title}
        </span>
      </div>

      {/* Description */}
      <div className="md:col-span-2 text-sm text-gray-600">
        {stringTrimer(description)}
      </div>

      {/* Due Date */}
      <div className="md:col-span-1 text-xs text-gray-500">
        {dueDate ? new Date(dueDate).toLocaleDateString() : '—'}
      </div>

      {/* Priority */}
      <div className="md:col-span-1">
        <span
          className={`px-2 py-1 rounded text-white text-xs
            ${priority === 'High'
              ? 'bg-red-500'
              : priority === 'Medium'
              ? 'bg-yellow-500'
              : 'bg-green-500'}`}
        >
          {priority}
        </span>
      </div>

      {/* Actions */}
      <div className="md:col-span-1 flex gap-2">
        <button
          onClick={handleEdit}
          className="px-3 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="px-3 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskItem
