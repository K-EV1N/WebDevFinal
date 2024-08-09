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
const PATH = 'http://localhost:5001/api/employees';


export const fetchEmployees = () => async (dispatch) => {
    try {
        let result = await axios.get(`${PATH}`);
        dispatch({type: 'employees/employeesLoaded', payload: result.data});
    } catch(error) {
        console.error(error);
    }
};

