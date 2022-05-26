import React from 'react'
import teacher from "../images/teacher.png"
import student from "../images/student.png"
import Header from './Header'
// import { Link , useHistory } from 'react-router-dom'
function Cards() {
    // const handleFailure = (result) => {
    //     alert(result);
    // };
    // const handleLogin = (googleData) => {
    //     console.log(googleData);
    // };
    
    return (
        <>
        <Header/>
        <div className="d-flex justify-content-evenly">

            <section className="team-section py-2 my-2">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-14 col-lg-5">
                            <div className="card shadow-lg pt-5 my-5 position-relative">
                                <div className="card-body p-4">
                                    <div className="member-profile position-absolute w-100 text-center">
                                        <img className="rounded-circle mx-auto d-inline-block shadow-sm" src={student} alt="" />
                                    </div>
                                    <div className="card-text pt-1">
                                        <h5 className="mb-0 text-center" style={{color : '#0B132B' , fontWeight : 'bold'}}>For Student</h5>
                                        <div className="mb-3 text-center mt-4" style={{color : '#0B132B' , fontWeight : 'bold'}}>Click here if you are a student and mark the attendance</div>
                                    </div>
                                </div>
                                
                                <a className="button-to-link" href="/student">Click here</a>
                                {/* <button className="link" onClick={() => history.push('/student')}>
                                        click here
                                </button> */}

                            </div>
                        </div>

                        <div className="col-14 col-lg-5">
                            <div className="card shadow-lg pt-5 my-5 position-relative">
                                <div className="card-body p-4">
                                    <div className="member-profile position-absolute w-100 text-center">
                                        <img className="rounded-circle mx-auto d-inline-block shadow-sm" src={teacher} alt="" />
                                    </div>
                                    <div className="card-text pt-1">
                                        <h5 className="mb-0 text-center" style={{color : '#0B132B' , fontWeight : 'bold'}}>For Teacher</h5>
                                        <div className="mb-3 text-center mt-4" style={{color : '#0B132B' , fontWeight : 'bold'}}>Click here if you are a teacher and see attendance details.</div>
                                    </div>
                                </div>
                                
                                <a className="button-to-link" href="/teacher">Click here</a>
                                
                            </div>
                        </div>

                    </div>

                </div>

            </section>
        </div>
        </>
    )
}

export default Cards