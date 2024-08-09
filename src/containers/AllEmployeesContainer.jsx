import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchEmployees } from '../store/EmployeeRedux';
import AllEmployeeView from '../pages/AllEmployeeView';

function AllEmployeesContainer() {
    const employees = useSelector((state) => state.employees);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    return (
        <AllEmployeeView employees={employees}/>
    );
}

export default AllEmployeesContainer;

