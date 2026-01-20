import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createTask } from '../redux/taskSlice'

const CreateTask = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
  })
  const [error, setError] = useState({
    title: '',
    description: '',
    dueDate: '',
  })

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let errorAvailable = false

    // Validate title
    if (!formData.title) {
      setError((prev) => ({ ...prev, title: 'Task title is required' }))
      errorAvailable = true
    } else if (formData.title.length < 3) {
      setError((prev) => ({ ...prev, title: 'Title must be at least 3 characters' }))
      errorAvailable = true
    } else {
      setError((prev) => ({ ...prev, title: '' }))
    }

    // Validate description
    if (!formData.description) {
      setError((prev) => ({ ...prev, description: 'Description is required' }))
      errorAvailable = true
    } else {
      setError((prev) => ({ ...prev, description: '' }))
    }

    // Validate due date
    if (!formData.dueDate) {
      setError((prev) => ({ ...prev, dueDate: 'Due date is required' }))
      errorAvailable = true
    } else {
      const selectedDate = new Date(formData.dueDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        setError((prev) => ({ ...prev, dueDate: 'Due date cannot be in the past' }))
        errorAvailable = true
      } else {
        setError((prev) => ({ ...prev, dueDate: '' }))
      }
    }

    if (errorAvailable) return

    // Create task (mock dispatch)

    dispatch(createTask(formData))
    .then((res) => {
    if (!res.error) {
      navigate('/tasks');
    }
  });
    console.log('Creating task:', formData)
    // dispatch(createTask(formData))

    // Reset form and navigate
    // setFormData({
    //   title: '',
    //   description: '',
    //   dueDate: '',
    //   priority: 'Medium',
    // })
    // navigate('/tasks')
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Create New Task</h1>
          <p className="text-gray-500 text-sm mt-2">Add a new task to your task list</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter task title..."
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            {error.title && <div className="text-red-500 text-xs mt-1">{error.title}</div>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter task description..."
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
            />
            {error.description && <div className="text-red-500 text-xs mt-1">{error.description}</div>}
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleFormChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            {error.dueDate && <div className="text-red-500 text-xs mt-1">{error.dueDate}</div>}
          </div>

          {/* Priority Level */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Priority Level <span className="text-red-500">*</span>
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleFormChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Priority Badge Preview */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Priority Preview:</span>
            <span
              className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                formData.priority === 'High'
                  ? 'bg-red-500'
                  : formData.priority === 'Medium'
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
            >
              {formData.priority}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Create Task
            </button>
            <button
              type="button"
              onClick={() => navigate('/tasks')}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTask
