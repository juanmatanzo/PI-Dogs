import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.modules.css';



export default function LandingPage(){
    return (
        <div className="landing_page">
            <div>
                <h1 className="title_landing">PI Dogs Soy Henry</h1>
                <p className="subtitle_landing">By Juan Cruz Matanzo</p>
                <Link className="link_landing" to='/home'>
                    <button className="button_landing">Let's Start!
                        <div className="button__horizontal"></div>
                        <div className="button__vertical"></div>
                    </button>
                </Link>
            </div>
        </div>
    )
}