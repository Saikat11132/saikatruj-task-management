import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getTaskById, updateTask } from '../redux/taskSlice'

const EditTask = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { selectedTask, loading } = useSelector((state) => state.task)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    status: 'Pending',
  })

  const [error, setError] = useState({})

  /* Fetch task on load */
  useEffect(() => {
    if (id) {
      dispatch(getTaskById(id))
    }
  }, [id, dispatch])

  /* Fill form once task is fetched */
  useEffect(() => {
    if (selectedTask) {
      setFormData({
        title: selectedTask.title || '',
        description: selectedTask.description || '',
        dueDate: selectedTask.dueDate
          ? selectedTask.dueDate.split('T')[0]
          : '',
        priority: selectedTask.priority || 'Medium',
        status: selectedTask.status || 'Pending',
      })
    }
  }, [selectedTask])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let errors = {}
    if (!formData.title ) {
      errors.title = 'Title field is required'
    }
    if (!formData.description ) {
      errors.description = 'Description field is required'
    }
    if (!formData.dueDate) {
      errors.dueDate = 'Due date is required'
    }

    setError(errors)
    if (Object.keys(errors).length > 0) return

    // 🔁 Dispatch updateTask here
    dispatch(
    updateTask({
      taskId: id,
      taskData: formData,
    })
  ).then((res) => {
    if (!res.error) {
      navigate('/tasks');
    }
  });

    console.log('Updating task:', id, formData)
    // navigate('/tasks')
  }

  if (loading) {
    return <p className="text-center py-10">Loading task...</p>
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Edit Task</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="font-semibold text-sm">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
            />
            {error.title && <p className="text-red-500 text-xs">{error.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold text-sm">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border rounded-lg"
            />
            {error.description && (
              <p className="text-red-500 text-xs">{error.description}</p>
            )}
          </div>

          {/* Due Date */}
          <div>
            <label className="font-semibold text-sm">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
            />
            {error.dueDate && (
              <p className="text-red-500 text-xs">{error.dueDate}</p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className="font-semibold text-sm">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="font-semibold text-sm">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Update Task
            </button>
            <button
              type="button"
              onClick={() => navigate('/tasks')}
              className="flex-1 bg-gray-300 py-3 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditTask
