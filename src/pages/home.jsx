import React from "react";
import HomeCSS from '../styles/home.module.css'
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className={HomeCSS['buttonContainer']}>
            <Link to="/AllEmployeeView"><button>Employees</button></Link>
            <Link to="/"><button>Tasks</button></Link>
        </div>
        
    )
}

export default Home