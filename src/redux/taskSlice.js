import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_URL } from "../common/common";
import { toast } from "react-toastify";
import { getToken, setToken, setUserLocal } from "../common/tokenFunc";
import { login } from './userSlice';

export const createTask = createAsyncThunk('task/createTask', async (taskInfo) => {
    try {

        const token  = getToken();
        const response = await fetch(API_URL + 'tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(taskInfo),
        }); 
        const data = await response.json();
        console.log("Create Task data:", data);
        if (data.status) {
            toast.success("Task created successfully!");
        }else{
            toast.error(data.message || "Task creation failed!");
        }
        return data;
    } catch (error) {
        console.log(error);
        toast.error(error.message || "Task creation failed!");
        throw new Error('Error in creating task!');
    }
});

export const searchtasks = createAsyncThunk('task/searchtasks', async (searchParams) => {
    // Build query string from provided searchParams and perform GET /tasks
    const token = getToken();
    const params = new URLSearchParams();
    const { search, status, priority, sortBy, page, limit } = searchParams || {};
    if (search) params.append('search', search);
    if (status) params.append('status', status);
    if (priority) params.append('priority', priority);
    if (sortBy) params.append('sortBy', sortBy);
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);

    const qs = params.toString();
    const url = API_URL + 'tasks' + (qs ? `?${qs}` : '');

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch tasks');
    return data;
});
// export const 
export const getTaskById = createAsyncThunk(
    'task/getTaskById',
    async (taskId, { rejectWithValue }) => {
        try {
            const token = getToken();

            const response = await fetch(`${API_URL}tasks/${taskId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok || !data.status) {
                return rejectWithValue(data.message || 'Failed to fetch task');
            }

            return data.data.task;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch task');
        }
    }
);
export const updateTask = createAsyncThunk(
  'task/updateTask',
  async ({ taskId, taskData }, { rejectWithValue }) => {
    try {
      const token = getToken();

      const response = await fetch(`${API_URL}tasks/${taskId}`, {
        method: 'PUT', // or PATCH if your route uses PATCH
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      const data = await response.json();

      if (!response.ok || !data.status) {
        return rejectWithValue(data.message || 'Failed to update task');
      }

      toast.success('Task updated successfully!');
      return data.data.task;
    } catch (error) {
      toast.error(error.message || 'Task update failed!');
      return rejectWithValue(error.message);
    }
  }
);
export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async (taskId, { rejectWithValue }) => {
    try {
      const token = getToken();

      const response = await fetch(`${API_URL}tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok || !data.status) {
        return rejectWithValue(data.message || 'Failed to delete task');
      }

      toast.success('Task deleted successfully!');
      return taskId;
    } catch (error) {
      toast.error(error.message || 'Task deletion failed!');
      return rejectWithValue(error.message);
    }
  }
);


const taskSlice = createSlice({
    name: 'counter',
    initialState: {
    tasks: [],
    selectedTask: null,
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
},
    reducers: {

        // setUser: (state, action) => {
        //     state.userData = action.payload;
        // },

    },
    extraReducers: (builder) => {
        builder
          .addCase(login.pending, (state) => {
            state.userData = null;
          })
          .addCase(login.fulfilled, (state, action) => {
            state.userData = action.payload;
          })
          .addCase(login.rejected, (state, action) => {
            state.userData = null;
          })
          .addCase(searchtasks.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(searchtasks.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            const payload = action.payload.data || action.payload;
            state.tasks = payload.tasks || [];
            state.currentPage = payload.pagination?.currentPage || 1;
            state.totalPages = payload.pagination?.totalPages || 1;
          })
          .addCase(searchtasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch tasks';
            state.tasks = [];
            state.currentPage = 1;
            state.totalPages = 1;
          })
          .addCase(getTaskById.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.selectedTask = null;
        })
        .addCase(getTaskById.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedTask = action.payload;
        })
        .addCase(getTaskById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Failed to load task';
            state.selectedTask = null;
        })
        .addCase(updateTask.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
        .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTask = action.payload;

        // Update task in task list (if already loaded)
        const index = state.tasks.findIndex(
            (task) => task._id === action.payload._id
        );
        if (index !== -1) {
            state.tasks[index] = action.payload;
        }
        })
        .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update task';
        })
        .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;

        // Remove task from list
        state.tasks = state.tasks.filter(
            (task) => task._id !== action.payload
        );
        })
        .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete task';
        });


                
    }
})



export const {  } = taskSlice.actions
export default taskSlice.reducer