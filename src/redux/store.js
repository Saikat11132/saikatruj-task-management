import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import taskSlice from './taskSlice'

export default configureStore({
    reducer: {
        user: userSlice,
        task:taskSlice
    }
})