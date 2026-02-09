import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchtasks } from '../redux/taskSlice'
import { Link } from 'react-router-dom'
import TaskItem from '../components/TaskItem'

const Tasks = () => {
  const dispatch = useDispatch()
  const { tasks, loading, error, currentPage, totalPages } = useSelector((state) => state.task)

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [sortBy, setSortBy] = useState('dueDate')

  const [page, setPage] = useState(1)
  const [limit] = useState(10)

  const fetchTasks = (opts = {}) => {
    dispatch(searchtasks(opts))
  }

  useEffect(() => {
    fetchTasks({ search, status, priority, sortBy, page, limit })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sortBy])

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    fetchTasks({ search, status, priority, sortBy, page: 1, limit })
  }

  const resetFilters = () => {
    setSearch('')
    setStatus('')
    setPriority('')
    setSortBy('dueDate')
    setPage(1)
    fetchTasks({ page: 1, limit })
  }

  return (
    <div className=" mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Link to="/create-task" className="bg-blue-600 text-white px-3 py-2 rounded">Create Task</Link>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 md:items-end md:gap-4">
          <div className="flex-1">
            <label className="text-sm">Search</label>
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="Search title or description" />
          </div>
          <div>
            <label className="text-sm">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="block mt-1 p-2 border rounded">
              <option value="">Any</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="text-sm">Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="block mt-1 p-2 border rounded">
              <option value="">Any</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <label className="text-sm">Sort</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="block mt-1 p-2 border rounded">
              <option value="dueDate">Due Date (asc)</option>
              <option value="dueDate-desc">Due Date (desc)</option>
              <option value="priority">Priority (asc)</option>
              <option value="priority-desc">Priority (desc)</option>
              <option value="createdAt">Created At</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Apply</button>
            <button type="button" onClick={resetFilters} className="px-4 py-2 border rounded">Reset</button>
          </div>
        </form>
      </div>

      <div className="bg-white p-4 rounded shadow">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : tasks.length === 0 ? (
          <div>No tasks found.</div>
        ) : (
          <div className="space-y-3">
            {tasks.map((t) => (
              <TaskItem key={t._id } task={t} />
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">Page {currentPage} of {totalPages}</div>
          <div className="flex gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage <= 1} className="px-3 py-1 border rounded">Prev</button>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage >= totalPages} className="px-3 py-1 border rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tasks