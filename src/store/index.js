import {configureStore} from '@reduxjs/toolkit'
import { EmployeeReducer } from './EmployeeRedux'
import { TaskReducer } from './TaskRedux'

const store = configureStore({
    reducer: {
        employees: EmployeeReducer,
        tasks: TaskReducer,
    }
})

export default store;