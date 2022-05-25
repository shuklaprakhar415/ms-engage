import React from 'react'
import headerImg from "../images/headerImg.png"
function Header() {
    return (
        <div>
            <div style={{background: `url(${headerImg})`}} className="jumbotron bg-cover text-white">
                <div className="container py-5 text-center">
                    <h1 className="display-5" style={{fontWeight : 'bold'}}>Smart Attendance</h1>
                    <p className="font-italic mb-0" style={{fontWeight : 'bold'}}>Attendance Tracking By Face Recognition</p>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
            </div>

            
        </div>
    )
}

export default Header