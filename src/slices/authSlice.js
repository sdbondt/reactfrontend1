import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleThunkMethod } from "../utils/handleThunkMethod";

const authURL = process.env.REACT_APP_API_URL + 'auth/'
const api = axios.create({
    baseURL: authURL
})

const initialState = {
    token: localStorage.getItem('token') || '',
    loading: false,
    error: ''
}

export const login = createAsyncThunk('/auth/login', async (credentials, thunkApi) => {
    const fn = async () => {
        const res = await api.post('/login', credentials);
        return res.data.token
    }
    return handleThunkMethod(fn, thunkApi)
});

export const signup = createAsyncThunk('/auth/signup', async (credentials, thunkApi) => {
    const fn = async () => {
        const res = await api.post('/signup', credentials)
        return res.data.token
    }
    return handleThunkMethod(fn, thunkApi)
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = ''
            localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true
        });
        builder.addCase(login.fulfilled, (state, { payload}) => {
            state.loading = false
            state.token = payload
            state.error= ''
            localStorage.setItem('token', payload)
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false
            state.token = ''
            state.error = action.payload.error
        });
        builder.addCase(signup.pending, (state) => {
            state.loading = true
        });
        builder.addCase(signup.fulfilled, (state, { payload }) => {
            state.loading = false
            state.token = payload
            state.error= ''
            localStorage.setItem('token', payload)
        });
        builder.addCase(signup.rejected, (state, { payload }) => {
            state.loading = false
            state.token = ''
            state.error = payload.error
        })
    }
})

export const getAuthState = state => state.auth
export const { logout } = authSlice.actions
export default authSlice.reducer