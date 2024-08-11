import {configureStore} from '@reduxjs/toolkit'
import { EmployeeReducer } from '../store/EmployeeRedux'
import { TasksReducer } from '../store/TaskRedux'

const store = configureStore({
    reducer: {
        employees: EmployeeReducer,
        tasks: TasksReducer,
    }
})

export default store;