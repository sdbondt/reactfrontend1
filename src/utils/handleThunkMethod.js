export const handleThunkMethod = async(fn, thunkApi) => {
    try {
        const res = await fn()
        return res
    } catch (e) {
        return thunkApi.rejectWithValue({ error: e.response?.data?.message || 'Something went wrong' });
    }
}