const initialState = [];

export function TaskReducer(state = initialState, action) {
    switch(action.type) {
        case 'tasks/tasksLoaded':
            return action.payload;
        default:
            return state;
    }
};

import axios from "axios";

const PATH = "http://localhost:5001/api/tasks";

export const fetchTasks = () => async (dispatch) => {
    try {
        let result = await axios.get(`${PATH}`);
        dispatch({type: 'tasks/tasksLoaded', payload: result.data});
    } catch(error) {
        console.error(error);
    }
};