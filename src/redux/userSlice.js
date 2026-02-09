import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_URL } from "../common/common";
import { toast } from "react-toastify";
import { setToken, setUserLocal } from "../common/tokenFunc";



export const login = createAsyncThunk('user/login', async (credentials) => {
    try {
        const response = await fetch(API_URL + 'auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        console.log("Login response data:", data);
         if (data.status) {
            setToken(data.data.token);
        setUserLocal(data.data.user);
            toast.success(data.message || "Login successful!");
        }else{
            
            toast.error(data.message || "Login failed!");
            // throw new Error(data.message || 'Login failed!');
        }
        console.log("Login data:", data.data);
        return data;
    } catch (error) {
        toast.error(error.message || "Registration failed!");
        throw new Error('Error in logging in!');
    }
});

export const register = createAsyncThunk('user/register', async (userInfo) => {
    try {
        const response = await fetch(API_URL + 'auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });
        
        const data = await response.json();
        console.log("Register data:", data);
        if (data.status) {
            toast.success("Registration successful!");
        }else{
            toast.error(data.message || "Registration failed!");
        }
        return data;
    } catch (error) {
        console.log(error);
        toast.error(error.message || "Registration failed!");
        throw new Error('Error in registering!');
    }
});

const userSlice = createSlice({
    name: 'counter',
    initialState: {
        userData: null
    },
    reducers: {

        setUser: (state, action) => {
            state.userData = action.payload;
        },

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
          });
                
    }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer