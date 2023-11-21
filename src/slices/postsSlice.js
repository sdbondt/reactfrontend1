import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleThunkMethod } from "../utils/handleThunkMethod";
import { createQueryString } from "../utils/createQueryString";
import { setComments } from "./commentsSlice";

const postsURL = process.env.REACT_APP_API_URL + 'posts'
const api = axios.create({
    baseURL: postsURL
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
})

const initialState = {
    posts: [],
    post: {},
    loading: false,
    error: '',
    totalCount: 0,
    searchParams: {
        limit: 10,
        page: 1,
        direction: 'desc',
        sortBy: 'date',
        q: '',
      },
}

export const createPost = createAsyncThunk('/posts/createPost', async (postData, thunkApi) => {
    const fn = async () => {
        const res = await api.post('/', postData)
        return res.data.post
    }
    return handleThunkMethod(fn, thunkApi)
})

export const getPosts = createAsyncThunk('/posts/getPosts', async (_, thunkApi) => {
    const { searchParams } = thunkApi.getState().posts
    const queryString = createQueryString(searchParams)
    const fn = async () => {
        const res = await api.get('/' + queryString)
        return res.data
    }
    return handleThunkMethod(fn, thunkApi)
})

export const getPost = createAsyncThunk('/posts/singlePost', async (postID, thunkApi) => {
    const fn = async () => {
        const res = await api.get(`/${postID}`)
        const { post } = res.data
        if(post && post.comments.length >0) thunkApi.dispatch(setComments(post.comments))
        return post
    }
    return handleThunkMethod(fn, thunkApi)
})

export const updatePost = createAsyncThunk('/posts/updatePost', async ({postID, updateData}, thunkApi) => {
    const fn = async () => {
        const res = await api.patch(`/${postID}`, updateData)
        return res.data.post
    }
    return handleThunkMethod(fn, thunkApi)
})

export const deletePost = createAsyncThunk('/posts/deletePost', async (postID, thunkApi) => {
    const fn = async () => {
        await api.delete(`/${postID}`)
    }
    return handleThunkMethod(fn, thunkApi)
})


const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setSearchParams: (state, { payload }) => {
            state.searchParams = { 
                ...state.searchParams,
                ...payload
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createPost.pending, (state) => {
            state.loading = true
        });
        builder.addCase(createPost.fulfilled, (state, { payload }) => {
            state.loading = false
            state.error = ''
            const updatedPosts = state.posts.slice(0, -1)
            state.posts = [payload, ...updatedPosts]
            state.totalCount++
        });
        builder.addCase(createPost.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload.error
        });
        builder.addCase(getPosts.pending, (state) => {
            state.loading = true
        });
        builder.addCase(getPosts.fulfilled, (state, { payload }) => {
            state.loading = false
            state.error = ''
            state.posts = payload.posts
            state.totalCount = payload.totalCount
        });
        builder.addCase(getPosts.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload.error
        });
        builder.addCase(getPost.pending, (state) => {
            state.loading = true
        });
        builder.addCase(getPost.fulfilled, (state, { payload }) => {
            state.loading = false
            state.error = ''
            state.post = payload
        });
        builder.addCase(getPost.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload.error
        });
        builder.addCase(updatePost.pending, (state) => {
            state.loading = true
        });
        builder.addCase(updatePost.fulfilled, (state, { payload }) => {
            state.loading = false
            state.error = ''
            const updatedPosts = state.posts.map((post) => {
                if (post.id === payload.id) return payload
                else return post
            })
            state.posts = updatedPosts
            state.post = payload
        })
        builder.addCase(updatePost.rejected, (state, payload) => {
            state.loading = false
            state.error = payload.error
        });
        builder.addCase(deletePost.pending, (state) => {
            state.loading = true
        });
        builder.addCase(deletePost.fulfilled, (state, { meta }) => {
            state.loading = false
            state.error = ''
            const updatedPosts = state.posts.filter((post) => post.id !== meta.arg)
            state.posts = updatedPosts
            state.totalCount--
        });
        builder.addCase(deletePost.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload.error
        })
    }
})

export const getPostsState = (state) => state.posts
export const { setSearchParams } = postsSlice.actions
export default postsSlice.reducer