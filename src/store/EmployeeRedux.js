const initialState = [];

export function EmployeeReducer(state = initialState, action) {
    switch(action.type) {
        case 'employees/employeesLoaded':
            return action.payload;
        case 'employees/employeeDeleted':
            return state.filter(employee => employee.id !== action.payload);
        case 'employees/employeeAdded':
            return[...state, action.payload]
        case 'employees/employeeUpdated':
            return state.map(employee => 
                employee.id === action.payload ? action.payload : employee
            );
        default:
            return state;
    }
};

import axios from "axios";
const PATH = 'http://localhost:5001/api/employees';


export const fetchEmployees = () => async (dispatch) => {
    try {
        let result = await axios.get(`${PATH}`);
        dispatch({type: 'employees/employeesLoaded', payload: result.data});
    } catch(error) {
        console.error(error);
    }
};

export const deleteEmployee = employeeId => async dispatch => {
    try {
        await axios.delete(`${PATH}/${employeeId}`);
        dispatch({type: 'employees/employeeDeleted', payload: employeeId});
    } catch(error) {
        console.error(error);
    }
}

export const addEmployee = (employee) => async (dispatch) => {
    try {
        let response = await axios.post(`${PATH}`, employee);
        dispatch({type: 'employees/employeeAdded', payload: response.data})
    } catch(error) {
        console.log(error)
    }
}

export const editEmployee = (employee) => async dispatch => {
    try {
        let response = await axios.put(`${PATH}/${employee.id}`, employee);
        dispatch({type: 'employees/employeeUpdated', payload: response.data});
    } catch(error) {
        console.log(error);
    }
};
