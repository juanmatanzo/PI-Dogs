import React from "react";
import { Link } from "react-router-dom";



export default function LandingPage(){
    return (
        <div>
            <div>
                <h1>Welcome to the Dog's Project</h1>
                <Link to='/home'>
                    <button>Let's Start!</button>
                </Link>
            </div>
        </div>
    )
}