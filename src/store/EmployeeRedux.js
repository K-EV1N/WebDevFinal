const initialState = [];

export function EmployeeReducer(state = initialState, action) {
    switch(action.type) {
        case 'employees/employeesLoaded':
            return action.payload;
        default:
            return state;
    }
};

import axios from "axios";
const PATH = 'https://jsonplaceholder.typicode.com';


export const fetchEmployees = () => async (dispatch) => {
    try {
        let result = await axios.get(`${PATH}/users`);
        dispatch({type: 'employees/employeesLoaded', payload: result.data});
    } catch(error) {
        console.error(error);
    }
};

