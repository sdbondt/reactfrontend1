import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleThunkMethod } from "../utils/handleThunkMethod";
import axios from "axios";

const commentsURL = process.env.REACT_APP_API_URL + 'comments/'
const postsURL = process.env.REACT_APP_API_URL + 'posts/'

const commentsApi = axios.create({ baseURL: commentsURL })
const postsApi = axios.create({ baseURL: postsURL })

const initialState = {
    comments: [],
    error: '',
    loading: false
}

postsApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
})

commentsApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
})

export const createComment = createAsyncThunk('/comments/createComment', async ({ postID, content }, thunkApi) => {
    const fn = async () => {
        const res = await postsApi.post(postID + '/comments', { content })
        return res.data.comment
    }

    return handleThunkMethod(fn, thunkApi)
})

export const updateComment = createAsyncThunk('/comments/updateComment', async ({ commentID, content }, thunkApi) => {
    const fn = async () => {
        const res = await commentsApi.patch(`/${commentID}`, { content })
        return res.data.comment
    }
    return handleThunkMethod(fn, thunkApi)
})

export const deleteComment = createAsyncThunk('/comments/deleteComment', async (commentID, thunkApi) => {
    const fn = async () => {
        await commentsApi.delete(`/${commentID}`)
    }
    return handleThunkMethod(fn, thunkApi)
})

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setComments: (state, action) => {
            state.comments = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createComment.pending, (state) => {
            state.loading = true
        });
        builder.addCase(createComment.fulfilled, (state, { payload }) => {
            state.loading = false
            state.comments.unshift(payload)
            state.error = ''
        });
        builder.addCase(createComment.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload.error
        });
        builder.addCase(updateComment.pending, (state) => {
            state.loading = true
        });
        builder.addCase(updateComment.fulfilled, (state, { payload }) => {
            state.loading = false
            state.error = ''
            const updatedComments = state.comments.map((comment) => {
                if (comment._id === payload._id) return payload
                else return comment
            })
            state.comments = updatedComments
        });
        builder.addCase(updateComment.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload.error
        });
        builder.addCase(deleteComment.pending, (state) => {
            state.loading = true
        });
        builder.addCase(deleteComment.fulfilled, (state, { meta }) => {
            state.loading = false
            state.error = ''
            const updatedComments = state.comments.filter((comment) => comment._id !== meta.arg)
            state.comments = updatedComments
        });
        builder.addCase(deleteComment.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload.error
        })
    }
})
export const getCommentsState = (state) => state.comments
export const { setComments } = commentsSlice.actions
export default commentsSlice.reducer