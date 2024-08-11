import React from "react";
import HomeCSS from '../styles/home.module.css'
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className={HomeCSS['buttonContainer']}>
            <h1 className={HomeCSS['welcome']}>WELCOME!</h1>
            <Link to="/AllEmployeesView"><button>Employees</button></Link>
            <Link to="/AllTasksView"><button>Tasks</button></Link>
        </div>
    )
}

export default Home