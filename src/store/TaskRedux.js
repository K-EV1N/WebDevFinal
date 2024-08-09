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

const PATH = "https://jsonplaceholder.typicode.com";

export const fetchTasks = () => async (dispatch) => {
    try {
        let result = await axios.get(`${PATH}/todos`);
        dispatch({type: 'tasks/tasksLoaded', payload: result.data});
    } catch(error) {
        console.error(error);
    }
};