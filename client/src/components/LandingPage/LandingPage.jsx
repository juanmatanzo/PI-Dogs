import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.modules.css';



export default function LandingPage(){
    return (
        <div className="landing_page">
            <div>
                <h1 className="title_landing">Welcome to the Dog's Project</h1>
                <Link to='/home'>
                    <button className="button_landing">Let's Start!</button>
                </Link>
            </div>
        </div>
    )
}