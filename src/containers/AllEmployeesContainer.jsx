import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchEmployees } from '../store/EmployeeRedux';
import AllEmployeesView from '../pages/AllEmployeesView';

function AllEmployeesContainer() {
    const employees = useSelector((state) => state.employees);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    return (
        <AllEmployeesView initialEmployees={employees}/>
    );
}

export default AllEmployeesContainer;

